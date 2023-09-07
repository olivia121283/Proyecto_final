const express = require('express')
const router = express.Router()
const {getPeliculas, createPeliculas, updatePeliculas, deletePeliculas } = require('../controllers/peliculaControllers')
const { protect } = require ('../middleware/authMiddleware')

router.route('/').get( protect, getPeliculas).post(protect, createPeliculas)
router.route('/:id').delete(protect, deletePeliculas).put(protect, updatePeliculas)

module.exports = router