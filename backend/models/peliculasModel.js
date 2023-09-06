const mongoose = require('mongoose')

const peliculaSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  original_title:{ 
    type:String,
    required: [true, 'Por favor teclea el titulo de la pelicula'],
  }
}, {
  timestamps : true

})

module.exports = mongoose.model('Pelicula', peliculaSchema)