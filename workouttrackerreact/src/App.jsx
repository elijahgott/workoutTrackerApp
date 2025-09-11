import { useState } from 'react'
import { Routes, Route } from 'react-router'

import NavigationBar from './components/NavigationBar'
import Home from './components/Home'
import CreateNew from './components/CreateNew'

const user = {
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
}

function App() {
  const [workouts, setWorkouts] = useState(user.workouts)
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route index element={<Home currentUser={user} />} />
        <Route path='create' element={<CreateNew currentUser={user} workouts={workouts} setWorkouts={setWorkouts} />} />
      </Routes>
    </>
  )
}

export default App
