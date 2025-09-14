import { useState } from 'react'

import Workout from './Workout'
import CreateWorkout from './CreateWorkout'
import CreateExercise from './CreateExercise'

const Home = ({ currentUser, setCurrentUser }) => {
  const [workouts, setWorkouts] = useState(currentUser.workouts)
  
  return(
    <>
      <h1>Welcome {currentUser.username}!</h1>
      <Workout currentUser={currentUser} setCurrentUser={setCurrentUser} workouts={workouts} setWorkouts={setWorkouts} />
      <p><strong>TODO: Implement ability to edit and delete workouts / exercises from frontend</strong></p>
      <CreateWorkout currentUser={currentUser} setCurrentUser={setCurrentUser} workouts={workouts} setWorkouts={setWorkouts} />
      <CreateExercise currentUser={currentUser} setCurrentUser={setCurrentUser} workouts={workouts} setWorkouts={setWorkouts} />
    </>
  )
}

export default Home