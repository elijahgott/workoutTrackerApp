import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'

// import userService from './services/users' // need for getting data from backend

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
  const [currentUser, setCurrentUser] = useState(null)
  // const [workouts, setWorkouts] = useState(null)

  useEffect(() => {
    setCurrentUser(user)
  }, [])

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route index element={<Home currentUser={currentUser} />} />
        <Route path='create' element={<CreateNew currentUser={currentUser} />} />
      </Routes>
    </>
  )
}

export default App
