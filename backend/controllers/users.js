const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Workout = require('../models/workout')
const Exercise = require('../models/exercise')

// get all users
usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('workouts', '-user')

  res.json(users)
})

// get specific user
usersRouter.get('/:id', (req, res) => {
  const id = req.params.id
  User.findById({ _id: id })
    .then(user => res.json(user))
    .catch(e => {
      console.log('Error fetching user: ', e)
      res.status(404).send({ error: 'Malformatted ID'})
    }) 
})

// delete specific user
usersRouter.delete('/:id', (req, res) => {
  const id = req.params.id
  User.findByIdAndDelete({ _id: id })
    .then(() => res.status(204).end())
    .catch(e => {
      console.log('Error deleting user: ', e)
      res.status(404).send({ error: `Error deleting user: ${e}` })
    })
})

// create new user
usersRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  if( !username || !password ){
    return res.status(400).json({error: 'Missing credentials'})
  }

  const user = new User({
    username,
    passwordHash,
    workouts: [],
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

// update user
usersRouter.put('/:id', (req, res) => {
  const id = req.params.id
  const body = req.body

  User.findById({ _id: id })
  .then(user => {
    if(!user){
      return res.status(404).end()
    }

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

module.exports = usersRouter