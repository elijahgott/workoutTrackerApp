import { useState, useEffect, useCallback } from 'react'
import workoutService from '../services/workouts'

import Workouts from './Workouts'
import CreateWorkout from './CreateWorkout'
import CreateExercise from './CreateExercise'

const Home = ({ currentUser, setCurrentUser }) => {
  const [workouts, setWorkouts] = useState([])

  const fetchWorkouts = useCallback( async () => {
    const allWorkouts = await workoutService.getAll()
    setWorkouts(allWorkouts.filter(w => w.user === currentUser.id))
  }, [currentUser.id])
  
  useEffect(() => {
    fetchWorkouts()
  }, [fetchWorkouts])
  
  return(
    <>
      <h1>TODO:</h1>
      <ul>
        <li>create user from frontend</li>
        <li>add notifications for actions</li>
        <li>sort workouts or search workouts</li>
      </ul>
      <h1>Welcome {currentUser.username}!</h1>
      <Workouts fetchWorkouts={fetchWorkouts} currentUser={currentUser} setCurrentUser={setCurrentUser} workouts={workouts} setWorkouts={setWorkouts} />
      <CreateWorkout fetchWorkouts={fetchWorkouts} currentUser={currentUser} setCurrentUser={setCurrentUser} workouts={workouts} setWorkouts={setWorkouts} />
      {workouts.length === 0 ? null 
      :
      <CreateExercise fetchWorkouts={fetchWorkouts} currentUser={currentUser} setCurrentUser={setCurrentUser} workouts={workouts} setWorkouts={setWorkouts} />
      }
    </>
  )
}

export default Home