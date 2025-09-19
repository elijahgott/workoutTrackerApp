import { useState } from 'react'
// import userService from '../services/users'
import workoutService from '../services/workouts'

const CreateWorkout = ({ fetchWorkouts, currentUser, workouts, setWorkouts }) => {
  const [workoutName, setWorkoutName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!workoutName){
      console.error('Missing workout name.')
    }
    else{
      const newWorkout = {
        name: workoutName,
        exercises: [],
        userId: currentUser.id
      }

      const updatedWorkouts = workouts.concat(newWorkout)
      workoutService.create(newWorkout)
      setWorkouts(updatedWorkouts)
      setWorkoutName('')

      setTimeout(() => fetchWorkouts(), 1000)
    }
  }

  return(
    <>
      <h1>Add New Workout</h1>
      <form onSubmit={handleSubmit}>
        <input id='workoutname' name="workoutname" type="text" value={workoutName} onChange={({target}) => setWorkoutName(target.value)} placeholder="Workout Name (Push, Legs, ...)" />
        <button type="submit">Add Workout</button>
      </form>
    </>
  )
}

export default CreateWorkout