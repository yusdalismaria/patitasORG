const asyncHandler = require('express-async-handler');

//@descripcion: get goals
//@route  GET /api/goals
//@access Private

const getMascotas = asyncHandler(async(req, res) => {
    res.status(200).json({ message: "get mascotas" })
})

//@descripcion: set goals
//@route  POST /api/goals
//@access Private

const setMascotas = asyncHandler(async(req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add text')
    }
    res.status(200).json({ message: "set mascotas" })
})

//@descripcion: update goals
//@route  PUT /api/goals/:id
//@access Private

const updateMascotas = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `update mascotas ${req.params.id}` })
})

//@descripcion: delete goals
//@route  DELETE /api/goals/:id
//@access Private

const deleteMascotas = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `delete mascotas ${req.params.id}` })
})

module.exports = {
    getMascotas,
    setMascotas,
    updateMascotas,
    deleteMascotas
}