const express = require('express')
const app = express()

const users = [
  {
    username: 'elo',
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

app.get('/api/users', (req, res) => {
  res.json(users)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})