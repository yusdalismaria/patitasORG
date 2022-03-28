const asyncHandler = require('express-async-handler');
const Aspirantes = require('../models/aspirantesModel')
const User = require('../models/aspirantesModel')

//@descripcion: get mascota
//@route  GET /api/mascota
//@access Private

const getAspirantes = asyncHandler(async(req, res) => {
    const aspirantes = await Aspirantes.find({ user: req.user.id });

    res.status(200).json(aspirantes)
})

//@descripcion: set mascota
//@route  POST /api/mascota
//@access Private

const setAspirantes = asyncHandler(async(req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add text')
    }

    const aspirantes = await Aspirantes.create({
        text: req.body.text,
        user: req.user.id,

    })
    res.status(200).json(aspirante)
})


//@descripcion: update mascota
//@route  PUT /api/mascota/:id
//@access Private

const updateAspirantes = asyncHandler(async(req, res) => {
    const aspirantes = await Aspirantes.findById(req.params.id)

    if (!aspirantes) {
        res.status(400)
        throw new Error('Aspirante no encontradaa')
    }

    //const user = await User.findById(req.user.id);
    //check x user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }
    //asegurarnos q el usario logeado es el de la mscota
    if (aspirantes.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized')
    }

    const updatedAspirantes= await Aspirantes.findByIdAndUpdate(req.params.id, req.body, { new: true, })
    res.status(200).json(updatedAspirantes)
})

//@descripcion: delete mascota
//@route  DELETE /api/mascota/:id
//@access Private

const deleteAspirantes = asyncHandler(async(req, res) => {
    const aspirantes = await Aspirantes.findById(req.params.id)

    if (!aspirantes) {
        res.status(400)
        throw new Error('Mascota no encontrada')
    }

    //const user = await User.findById(req.user.id);
    //check x user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }
    //asegurarnos q el usario logeado es el de la mscota
    if (aspirantes.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized')
    }

    await aspirantes.remove();

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getAspirantes,
    setAspirantes,
    updateAspirantes,
    deleteAspirantes
}