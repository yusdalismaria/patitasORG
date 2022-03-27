const express = require('express');
const router = express.Router();
const { getMascotas, setMascotas, updateMascotas, deleteMascotas } = require('../controllers/mascotasController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getMascotas).post(protect, setMascotas)

router.route('/:id').put(protect, updateMascotas).delete(protect, deleteMascotas)

module.exports = router