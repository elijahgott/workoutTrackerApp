import { useState } from 'react'
// import userService from '../services/users'
import workoutService from '../services/workouts'

import Notification from './Notification'

const CreateWorkout = ({ fetchWorkouts, currentUser, workouts, setWorkouts }) => {
  const [workoutName, setWorkoutName] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!workoutName){
      setNotificationMessage('Missing workout name.')

      setTimeout(() => setNotificationMessage(null), 3000)
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
      setNotificationMessage('Successfully created workout.')

      setTimeout(() => setNotificationMessage(null), 3000)

      setTimeout(() => fetchWorkouts(), 1000)
    }
  }

  return(
    <>
      <h1>Add New Workout</h1>
      <form onSubmit={handleSubmit}>
        <input id='workoutname' name="workoutname" type="text" value={workoutName} onChange={({target}) => setWorkoutName(target.value)} placeholder="Workout Name (Push, Legs, ...)" required />
        <button type="submit">Add Workout</button>
      </form>
      <Notification message={notificationMessage} />
    </>
  )
}

export default CreateWorkout