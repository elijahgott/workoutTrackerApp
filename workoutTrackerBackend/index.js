const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const morgan  = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()

const User = require('./models/user')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(express.static('dist'))
// app.use(cors)
app.use(morgan('tiny'))
app.use(requestLogger)

mongoose.set('strictQuery', false)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

// get all users
app.get('/api/users', (req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((e) => {
      console.log('Unable to fetch users: ', e)
      res.status(404).end()
    })
})

// get specific user
app.get('/api/users/:id', (req, res) => {
  const id = req.params.id
  User.findById({ _id: id })
    .then(user => res.json(user))
    .catch(e => {
      console.log('Error fetching user: ', e)
      res.status(404).send({ error: 'Malformatted ID'})
    }) 
})

// delete specific user
app.delete('/api/users/:id', (req, res) => {
  const id = req.params.id
  User.findByIdAndDelete({ _id: id })
    .then(() => res.status(204).end())
    .catch(e => {
      console.log('Error deleting user: ', e)
      res.status(404).send({ error: 'Error deleting user.' })
    })
})

// create new user
app.post('/api/users', async (req, res) => {
  const { username, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  if( !username || !password ){
    return res.status(400).json({error: 'Missing credentials'})
  }

  const user = new User({
    username,
    passwordHash,
    workouts: req.body.workouts || [],
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

// update user
app.put('/api/users/:id', (req, res) => {
  const id = req.params.id
  const body = req.body

  User.findById({ _id: id })
  .then(user => {
    if(!user){
      return res.status(404).end()
    }
    console.log(user)

    user.username = body.username
    user.workouts = body.workouts

    return user.save().then((updatedUser) => {
      res.json(updatedUser)
    })
  })
  .catch(e => {
    console.log('Error editing user: ', e)
    res.status(404).send({ error: 'Error editing user.' })
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})