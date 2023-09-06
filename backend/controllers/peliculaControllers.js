const asyncHandler = require('express-async-handler') 
const Pelicula = require('../models/peliculasModel')

const getPeliculas = asyncHandler(async (req, res) => {

  const peliculas = await Pelicula.find({ user: req.user.id})

  res.status(200).json(peliculas)
})

const createPeliculas = asyncHandler (async(req, res) => {

  if(!req.body.original_title){
  res.status(400)
  throw new Error('Por favor teclea un titulo')
}
  const pelicula = await Pelicula.create({
    original_title: req.body.original_title,
    user: req.user.id
  })
  res.status(201).json(pelicula)
})

const updatePeliculas = asyncHandler(async(req, res) => {

  const pelicula = await Pelicula.findById(req.params.id)
  if(!pelicula){
    res.status(400)
    throw new Error('Esa pelicula no existe')
  }

  if(pelicula.user.toString() !== req.user.id){
    res.status(401)
    throw new Error ('Acceso no autorizado')
  }else{
    const peliculaUpdate= await Pelicula.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(peliculaUpdate)
  }
})

const deletePeliculas = asyncHandler(async(req, res) => {

  const pelicula = await Pelicula.findById(req.params.id)

  if(!pelicula){
    res.status(400)
    throw new Error('Esa pelicula no existe')
  }
  if(pelicula.user.toString() !== req.user.id){
    res.status(401)
    throw new Error ('Acceso no autorizado')
  }else{
    pelicula.deleteOne()
    res.status(201).json({id: req.params.id})
  }
})


module.exports = {
  getPeliculas, 
  createPeliculas, 
  updatePeliculas, 
  deletePeliculas
}