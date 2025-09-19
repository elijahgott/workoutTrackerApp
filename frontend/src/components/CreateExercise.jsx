import { useState } from 'react'
import exerciseService from '../services/exercises'

import ExerciseInput from './ExerciseInput'

const CreateExercise = ({ fetchWorkouts, currentUser, workouts, setWorkouts }) => {
  const [workoutId, setWorkoutId] = useState('')
  const [exerciseName, setExerciseName] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')


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

      setTimeout(() => fetchWorkouts(), 1000)
    }
    else{
      console.error('Error submitting exercise.')
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
    </>
  )
}

export default CreateExercise