import { useState, useEffect } from 'react'
import workoutService from '../services/workouts'

import Workouts from './Workouts'
import CreateWorkout from './CreateWorkout'
import CreateExercise from './CreateExercise'

const Home = ({ currentUser, setCurrentUser }) => {
  const [workouts, setWorkouts] = useState('')
  
  useEffect(() => {
    const fetchWorkouts = async () => {
      const allWorkouts = await workoutService.getAll()
      setWorkouts(allWorkouts)
    }
    fetchWorkouts()
  }, [])
  
  return(
    <>
      <h1>TODO:</h1>
      <ul>
        <li>create workouts and exercises from frontend</li>
        <li>sort workouts or search workouts</li>
        <li>fix issue where you cant delete a newly created exercise / workout</li>
      </ul>
      <h1>Welcome {currentUser.username}!</h1>
      <Workouts currentUser={currentUser} setCurrentUser={setCurrentUser} workouts={workouts} setWorkouts={setWorkouts} />
      <CreateWorkout currentUser={currentUser} setCurrentUser={setCurrentUser} workouts={workouts} setWorkouts={setWorkouts} />
      {workouts.length === 0 ? null 
      :
      <CreateExercise currentUser={currentUser} setCurrentUser={setCurrentUser} workouts={workouts} setWorkouts={setWorkouts} />
      }
    </>
  )
}

export default Home