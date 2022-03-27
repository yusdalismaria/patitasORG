const asyncHandler = require('express-async-handler');
const Mascota = require('../models/mascotasModel')
const User = require('../models/userModel')

//@descripcion: get mascota
//@route  GET /api/mascota
//@access Private

const getMascotas = asyncHandler(async(req, res) => {
    const mascotas = await Mascota.find({ user: req.user.id });

    res.status(200).json(mascotas)
})

//@descripcion: set mascota
//@route  POST /api/mascota
//@access Private

const setMascotas = asyncHandler(async(req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add text')
    }

    const mascota = await Mascota.create({
        text: req.body.text,
        user: req.user.id,

    })
    res.status(200).json(mascota)
})


//@descripcion: update mascota
//@route  PUT /api/mascota/:id
//@access Private

const updateMascotas = asyncHandler(async(req, res) => {
    const mascota = await Mascota.findById(req.params.id)

    if (!mascota) {
        res.status(400)
        throw new Error('Mascota no encontradaa')
    }

    const user = await User.findById(req.user.id);
    //check x user
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }
    //asegurarnos q el usario logeado es el de la mscota
    if (mascota.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized')
    }

    const updatedMascota = await Mascota.findByIdAndUpdate(req.params.id, req.body, { new: true, })
    res.status(200).json(updatedMascota)
})

//@descripcion: delete mascota
//@route  DELETE /api/mascota/:id
//@access Private

const deleteMascotas = asyncHandler(async(req, res) => {
    const mascota = await Mascota.findById(req.params.id)

    if (!mascota) {
        res.status(400)
        throw new Error('Mascota no encontrada')
    }

    const user = await User.findById(req.user.id);
    //check x user
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }
    //asegurarnos q el usario logeado es el de la mscota
    if (mascota.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized')
    }

    await mascota.remove();

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getMascotas,
    setMascotas,
    updateMascotas,
    deleteMascotas
}