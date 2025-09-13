import { useState } from 'react'
import userService from '../services/users'

const CreateWorkout = ({ currentUser, setCurrentUser, workouts, setWorkouts }) => {
  const [workoutName, setWorkoutName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!workoutName){
      console.error('Missing workout name.')
    }
    else{
      const newWorkout = {
        name: workoutName,
        exercises: []
      }

      const updatedWorkouts = workouts.concat(newWorkout)
      const updatedUser = {
        username: currentUser.username,
        workouts: currentUser.workouts.concat(newWorkout),
        id: currentUser.id
      }

      userService.update(currentUser.id, updatedUser)
      setCurrentUser(updatedUser)
      setWorkouts(updatedWorkouts)
      setWorkoutName('')
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