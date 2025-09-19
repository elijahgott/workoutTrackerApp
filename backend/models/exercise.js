const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  sets: {
    type: Number,
    reqiured: true
  },
  reps: {
    type: Number,
    reqiured: true
  },
  weight: {
    type: Number,
    reqiured: true
  },
  workout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

exerciseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Exercise', exerciseSchema)