import { useState } from 'react'
import userService from '../services/users'

import ExerciseInput from './ExerciseInput'

const CreateExercise = ({ currentUser, setCurrentUser, workouts, setWorkouts }) => {
  const [workoutName, setWorkoutName] = useState('')
  const [exerciseName, setExerciseName] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')


  const handleSubmit = (event) => {
    event.preventDefault()

    if(workoutName && exerciseName && sets && reps && weight){
      const workout = currentUser.workouts.find(w => w.name === workoutName)

      const newExercise = {
        name: exerciseName,
        sets: parseInt(sets),
        reps: parseInt(reps),
        weight: parseInt(weight)
      }
    
      const updatedWorkout = {
        name: workout.name,
        exercises: workout.exercises.concat(newExercise)
      }
     
      const updatedUser = {
        username: currentUser.username,
        workouts: currentUser.workouts.map(w => w.name !== workoutName ? w : updatedWorkout),
        id: currentUser.id
      }
      userService.update(currentUser.id, updatedUser)
      setWorkouts(updatedUser.workouts)
      setCurrentUser(updatedUser)

      setExerciseName('')
      setSets('')
      setReps('')
      setWeight('')
    }
    else{
      console.log(workoutName, exerciseName, sets, reps, weight)
      console.error('Error submitting exercise')
    }
  }

  return(
    <>
      <h1>Add New Exercise</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <select defaultValue={''} onChange={ ({ target }) => setWorkoutName(target.value) }>
          <option value=''>Select a Workout</option>
          {workouts.map(w => <option key={ w.name } value={ w.name }>{ w.name }</option>)}
        </select>

        <ExerciseInput exerciseName={exerciseName} setExerciseName={setExerciseName}
        sets={sets} setSets={setSets}
        reps={reps} setReps={setReps}
        weight={weight} setWeight={setWeight} />
        
        <button type='submit'>Add Exercise</button>
      </form>
    </>
  )
}

export default CreateExercise