const express = require('express')
const mongoose = require('mongoose')
const morgan  = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()

const User = require('./models/user')

app.use(express.json())
app.use(express.static('dist'))
// app.use(cors)
app.use(morgan('tiny'))

mongoose.set('strictQuery', false)

const newUser = new User({
  username: 'elo',
  workouts: [
    {
      name: "push",
      exercises: [
        {
          name: "bench press",
          sets: 3,
          reps: 5,
          weight: 225
        },
        {
          name: "chest fly machine",
          sets: 2,
          reps: 8,
          weight: 150
        }
      ]
    },
    {
      name: "legs",
      exercises: [
        {
          name: "squat",
          sets: 3,
          reps: 5,
          weight: 315
        },
        {
          name: "hamstring curl machine",
          sets: 2,
          reps: 12,
          weight: 200
        }
      ]
    }
  ]
})

// newUser.save()
//   .then(() => {
//     console.log('elo saved to DB')
//   })
//   .catch((e) => {
//     console.log('error saving elo to db:', e)
//   })

let users = [
  {
    username: 'elo',
    id: '1',
    workouts: [
      {
        name: 'push',
        exercises: [
          {
            name: 'bench press',
            sets: 3,
            reps: 5,
            weight: 225
          },
          {
            name: 'chest fly machine',
            sets: 2,
            reps: 8,
            weight: 150
          }
        ]
      },
      {
        name: 'legs',
        exercises: [
          {
            name: 'squat',
            sets: 3,
            reps: 5,
            weight: 315
          },
          {
            name: 'hamstring curl machine',
            sets: 2,
            reps: 12,
            weight: 200
          }
        ]
      }
    ]
  },
  {
    username: 'judith',
    id: '2',
    workouts: [
      {
        name: 'push',
        exercises: [
          {
            name: 'bench press',
            sets: 3,
            reps: 8,
            weight: 135
          },
          {
            name: 'chest fly machine',
            sets: 2,
            reps: 10,
            weight: 100
          }
        ]
      }
    ]
  }
]

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
app.post('/api/users', (req, res) => {
  const body = req.body
  if(!body.username){
    return res.status(400).json({error: 'missing username'})
  }

  const user = new User({
    username: body.username,
    workouts: body.workouts || [],
  })

  user.save()
    .then(() => res.json(user))
    .catch(e => {
      console.log('Error creating user: ', e)
      res.status(404).send({ error: 'Error creating user.' })
    })
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

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})