const express = require('express');
const router = express.Router();
const { getMascotas, setMascotas, updateMascotas, deleteMascotas } = require('../controllers/mascotasController')

router.route('/').get(getMascotas).post(setMascotas)

router.route('/:id').put(updateMascotas).delete(deleteMascotas)

module.exports = router