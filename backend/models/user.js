const mongoose = require('mongoose')

// const uniqueValidator = require('mongoose-unique-validator')

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
  }
})

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  exercises: [exerciseSchema]
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  passwordHash: String,
  workouts: [workoutSchema]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // password hash should not be revealed
    delete returnedObject.passwordHash
  }
})

// schema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)