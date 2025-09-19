const workoutsRouter = require('express').Router()
const User = require('../models/user')
const Workout = require('../models/workout')
const Exercise = require('../models/exercise')

// get all workouts
workoutsRouter.get('/', async (req, res) => {
  const workouts = await Workout.find({}).populate('exercises', '-user -workout')

  res.json(workouts)
})

// get specific workout
workoutsRouter.get('/:id', async (req, res) => {
  const workout = await Workout.find({ _id: req.params.id }).populate('exercises', '-user -workout')
  res.json(workout)
})

// delete specific workout
workoutsRouter.delete('/:id', async (req, res) => {
  try{
    await Workout.findByIdAndDelete({ _id: req.params.id })
    res.status(204).end()
  }
  catch(error){
    res.status(404).send({ error: `Error deleting workout: ${e}` })
  }
})

// create workout
workoutsRouter.post('/', async (req, res) => {
  const { name, userId } = req.body

  const user = await User.findById({ _id: userId })

  if(!user){
    return response.status(400).json({ Error: 'User ID missing or invalid.' })
  }

  const workout = new Workout({
    name,
    exercises: [],
    user: user._id
  })

  const savedWorkout = await workout.save()
  user.workouts = user.workouts.concat(savedWorkout._id)
  await user.save()

  res.status(201).json(savedWorkout)
})

// update workout
workoutsRouter.put('/:id', async (req, res) => {
  const { name } = req.body

  const workout = await Workout.findById({ _id: req.params.id })

  if(!workout){
    return res.status(400).json({ error: `Could not find workout with ID ${req.params.id}.`})
  }

  workout.name = name

  workout.save()
  res.json(workout)
})

module.exports = workoutsRouter