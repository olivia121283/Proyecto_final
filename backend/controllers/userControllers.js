const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler') 
const User = require('../models/usersModel')

const registerUser = asyncHandler( async (req, res) =>{

  const {name, email, password} = req.body

  if(!name || !email || ! password){
    res.status(400)
    throw new Error('Faltan datos')

  }
  const userExists = await User.findOne({email})
  if(userExists) {
    res.status(400)
    throw new Error('Ese usuario ya existe, favor de verificar')
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPasword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email, 
    password: hashedPasword
  })
  if(user){
    res.status(201).json({
      _id: user._id,
      name : user.name,
      email: user.email
    })
  }else{
    res.status(400)
    throw new Error('No se pudo crear al usuario')
  }
})


const loginUser = asyncHandler( async (req, res) =>{

  const { email, password } = req.body
  const user = await User.findOne({email})
  if(user && (await bcrypt.compare(password, user.password))){
    res.status(201).json({
      _id: user._id,
      name : user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  }else{
    res.status(400)
    throw new Error('Credenciales incorrectas')
  }
})
const getUserData = asyncHandler( async (req, res) =>{
  res.json(req.user)
})

const generateToken = (id) =>{
  return jwt.sign({id},process.env.JWT_SECRET, {
    expiresIn: '15d'
  })
}

module.exports = {
  registerUser,
  loginUser,
  getUserData
}