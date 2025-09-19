const exercisesRouter = require('express').Router()
const User = require('../models/user')
const Workout = require('../models/workout')
const Exercise = require('../models/exercise')

// get all exercises
exercisesRouter.get('/', async (req, res) => {
  const exercises = await Exercise.find({}).populate('user workout', 'username name')

  res.json(exercises)
})

// get specific exercise
exercisesRouter.get('/:id', async (req, res) => {
  const exercise = await Exercise.find({ _id: req.params.id })
  res.json(exercise)
})

// delete specific exercise
exercisesRouter.delete('/:id', async (req, res) => {
  try{
      await Exercise.findByIdAndDelete({ _id: req.params.id })
      res.status(204).end()
    }
    catch(error){
      res.status(404).send({ error: `Error deleting exercise: ${e}` })
    }
})

// create exercise
exercisesRouter.post('/', async (req, res) => {
  const { name, sets, reps, weight, workoutId, userId } = req.body

  const user = await User.findById({ _id: userId })

  if(!user){
    return res.status(400).json({ error: 'User ID missing or invalid.' })
  }

  const workout = await Workout.findById({ _id: workoutId })

  if(!workout){
    return res.status(400).json({ error: 'Workout ID missing or invalid.' })
  }

  const exercise = new Exercise({
    name,
    sets,
    reps,
    weight,
    workout: workout._id,
    user: user._id
  })

  const savedexercise = await exercise.save()

  workout.exercises = workout.exercises.concat(savedexercise._id)
  await workout.save()

  // do i need to update user ?

  res.status(201).json(savedexercise)
})

// update exercise
exercisesRouter.put('/:id', async (req, res) => {
  const { name, sets, reps, weight } = req.body
  const exercise = await Exercise.findById({ _id: req.params.id })

  console.log(exercise)

  if(!exercise){
    return res.status(400).json({ error: `Could not find exercise with ID ${req.params.id}.`})
  }

  exercise.name = name
  exercise.sets = sets
  exercise.reps = reps
  exercise.weight = weight

  exercise.save()
  res.json(exercise)
})

module.exports = exercisesRouter