import { useState } from 'react'

import Workout from './Workout'
import CreateWorkout from './CreateWorkout'
import CreateExercise from './CreateExercise'

const Home = ({ currentUser, setCurrentUser }) => {
  const [workouts, setWorkouts] = useState(currentUser.workouts)
  
  return(
    <>
      <p><strong>TODO: Implement ability to sort workouts or search workouts</strong></p>
      <h1>Welcome {currentUser.username}!</h1>
      <Workout currentUser={currentUser} setCurrentUser={setCurrentUser} workouts={workouts} setWorkouts={setWorkouts} />
      <CreateWorkout currentUser={currentUser} setCurrentUser={setCurrentUser} workouts={workouts} setWorkouts={setWorkouts} />
      <CreateExercise currentUser={currentUser} setCurrentUser={setCurrentUser} workouts={workouts} setWorkouts={setWorkouts} />
    </>
  )
}

export default Home