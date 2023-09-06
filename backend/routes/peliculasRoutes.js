const express = require('express')
const router = express.Router()
const {getPeliculas, createPeliculas, updatePeliculas, deletePeliculas } = require('../controllers/peliculaControllers')
//const { protect } = require ('../middleware/authMiddleware')

router.route('/').get( getPeliculas).post( createPeliculas)
router.route('/:id').delete(deletePeliculas).put( updatePeliculas)

module.exports = router