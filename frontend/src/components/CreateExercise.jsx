import { useState } from 'react'
import exerciseService from '../services/exercises'

import ExerciseInput from './ExerciseInput'
import Notification from './Notification'

const CreateExercise = ({ fetchWorkouts, currentUser, workouts, setWorkouts }) => {
  const [workoutId, setWorkoutId] = useState('')
  const [exerciseName, setExerciseName] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if(workoutId && exerciseName && sets && reps && weight){
      const newExercise = {
        name: exerciseName,
        sets: parseInt(sets),
        reps: parseInt(reps),
        weight: parseInt(weight),
        workoutId: workoutId,
        userId: currentUser.id
      }
      exerciseService.create(newExercise)

      const workout = workouts.find(w => w.id === workoutId)
      const updatedExercises = workout.exercises.concat(newExercise)
      const updatedWorkout = {
        ...workout,
        exercises: updatedExercises
      }
      const updatedWorkouts = workouts.map(w => w.id !== workoutId ? w : updatedWorkout)
      setWorkouts(updatedWorkouts)

      setExerciseName('')
      setSets('')
      setReps('')
      setWeight('')

      setNotificationMessage('Successfully created exercise.')

      setTimeout(() => setNotificationMessage(null), 3000)

      setTimeout(() => fetchWorkouts(), 1000)
    }
    else{
      setNotificationMessage('Error submitting exercise.')

      setTimeout(() => setNotificationMessage(null), 3000)
    }
  }

  return(
    <>
      <h1>Add New Exercise</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <select defaultValue={''} onChange={ ({ target }) => setWorkoutId(target.value) }>
          <option value=''>Select a Workout</option>
          {workouts.map(w => <option key={ w.id } value={ w.id }>{ w.name }</option>)}
        </select>

        <ExerciseInput exerciseName={exerciseName} setExerciseName={setExerciseName}
        sets={sets} setSets={setSets}
        reps={reps} setReps={setReps}
        weight={weight} setWeight={setWeight} />
        
        <button type='submit'>Add Exercise</button>
      </form>
      <Notification message={notificationMessage} />
    </>
  )
}

export default CreateExercise