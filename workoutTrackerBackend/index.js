const express = require('express')
const morgan  = require('morgan')
const app = express()
app.use(express.json())
app.use(morgan('tiny'))

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

const generateId = () => {
  const maxId = users.length > 0 ? Math.max(...users.map(u => Number(u.id))) : 0

  return String(maxId + 1)
}

// get all users
app.get('/api/users', (req, res) => {
  res.json(users)
})

// get specific user
app.get('/api/users/:id', (req, res) => {
  const id = req.params.id
  const user = users.find(u => u.id === id)
  console.log(user)
  if(user){
    res.json(user)
  }
  else{
    res.status(404).end()
  }
})

// delete specific user
app.delete('/api/users/:id', (req, res) => {
  const id = req.params.id
  users = users.filter(u => u.id !== id)

  res.status(204).end()
})

// create new user
app.post('/api/users', (req, res) => {
  const body = req.body
  if(!body.username){
    return res.status(400).json({error: 'missing username'})
  }

  const user = {
    username: body.username,
    workouts: body.workouts || [],
    id: generateId()
  }

  users = users.concat(user)

  res.json(user)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})