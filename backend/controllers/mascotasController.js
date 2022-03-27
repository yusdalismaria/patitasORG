const asyncHandler = require('express-async-handler');
const Mascota = require('../models/mascotasModel')
    //@descripcion: get goals
    //@route  GET /api/goals
    //@access Private

const getMascotas = asyncHandler(async(req, res) => {
    const mascotas = await Mascota.find();

    res.status(200).json(mascotas)
})

//@descripcion: set goals
//@route  POST /api/goals
//@access Private

const setMascotas = asyncHandler(async(req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add text')
    }

    const mascota = await Mascota.create({
        text: req.body.text
    })
    res.status(200).json(mascota)
})


//@descripcion: update goals
//@route  PUT /api/goals/:id
//@access Private

const updateMascotas = asyncHandler(async(req, res) => {
    const mascota = await Mascota.findById(req.params.id)

    if (!mascota) {
        res.status(400)
        throw new Error('Mascota no encontradaa')
    }
    const updatedMascota = await Mascota.findByIdAndUpdate(req.params.id, req.body, { new: true, })
    res.status(200).json(updatedMascota)
})

//@descripcion: delete goals
//@route  DELETE /api/goals/:id
//@access Private

const deleteMascotas = asyncHandler(async(req, res) => {
    const mascota = await Mascota.findById(req.params.id)

    if (!mascota) {
        res.status(400)
        throw new Error('Mascota no encontrada')
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