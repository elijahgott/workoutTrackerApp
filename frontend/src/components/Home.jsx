import { useState } from 'react'

import Workout from './Workout'
import CreateWorkout from './CreateWorkout'
import CreateExercise from './CreateExercise'

const Home = ({ currentUser }) => {
  console.log(currentUser)
  const [workouts, setWorkouts] = useState(currentUser.workouts)

  return(
    <>
      <h1>Welcome {currentUser.username}!</h1>
      <Workout workouts={workouts} />
      <CreateWorkout currentUser={currentUser} workouts={workouts} setWorkouts={setWorkouts} />
      <CreateExercise workouts={workouts} setWorkouts={setWorkouts} />
    </>
  )
}

export default Home