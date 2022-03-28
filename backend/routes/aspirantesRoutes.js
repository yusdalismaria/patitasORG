const express = require('express');
const router = express.Router();
const { getAspirantes, setAspirantes, updateAspirantes, deleteAspirantes } = require('../controllers/aspirantesController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getAspirantes).post(protect, setAspirantes)

router.route('/:id').put(protect, updateAspirantes).delete(protect, deleteAspirantes)

module.exports = router