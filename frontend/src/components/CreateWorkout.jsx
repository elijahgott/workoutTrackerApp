import { useState } from 'react'

const CreateWorkout = ({ currentUser, workouts, setWorkouts }) => {
  const [workoutName, setWorkoutName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const workout = {
      name: workoutName,
      exercises: []
    }

    const updatedWorkouts = workouts.concat(workout)
    console.log(updatedWorkouts)
    setWorkouts(updatedWorkouts)

    console.log(`submitted workout ${workoutName} to ${currentUser.username}'s workouts`)
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