import { useState } from 'react'
import workoutService from '../services/workouts'
import exerciseService from '../services/exercises'

import ExerciseInput from './ExerciseInput'

const Workouts = ({ fetchWorkouts, workouts, setWorkouts }) => {

  const handleDeleteWorkout = async (event, workoutId) => { // needs update before deleting recently added workout
    event.preventDefault()

    const workout = await workoutService.getOne(workoutId)
    if(window.confirm(`Are you sure you want to delete workout: ${workout[0].name}?`)){
      const deleteWorkout = await workoutService.deleteById(workoutId)
      if(deleteWorkout.status !== 204){
        console.log('Error deleting workout.')
      }
      const updatedWorkouts = workouts.filter(w => w.id !== workoutId)
      setWorkouts(updatedWorkouts)
      setTimeout(() => fetchWorkouts(), 1000)
    }
  }

  const handleDeleteExercise = async (event, workoutId, exerciseId) => { // needs update before deleting recently added workout
    event.preventDefault()
    const deleteExercise = await exerciseService.deleteById(exerciseId)
    if(deleteExercise.status !== 204){
      console.log('Error deleting exercise.')
    }
    const workout = workouts.find(w => w.id === workoutId)
    const updatedExercises = workout.exercises.filter(e => e.id !== exerciseId)
      const updatedWorkout = {
        ...workout,
        exercises: updatedExercises
      }
      const updatedWorkouts = workouts.map(w => w.id !== workoutId ? w : updatedWorkout)
      setWorkouts(updatedWorkouts)
      setTimeout(() => fetchWorkouts(), 1000)
  }

  const [exerciseName, setExerciseName] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')

  const handleEditExercise = async (event, workoutId, exerciseId) => {
    event.preventDefault()

    if(!(exerciseName && sets && reps && weight)){
      console.log('One or more fields is empty.')
    }

    const workout = workouts.find(w => w.id === workoutId)
    const exercise = await exerciseService.getOne(exerciseId)
    toggleVisibility(exercise)
    
    const updatedExercise = {
      ...exercise,
      name: exerciseName,
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: parseInt(weight)
    }

    await exerciseService.update(exerciseId, updatedExercise)

    const updatedWorkout = {
      ...workout,
      exercises: workout.exercises.map(e => e.id !== exerciseId ? e : updatedExercise)
    }
    
    const updatedWorkouts = workouts.map(w => w.id !== workoutId ? w : updatedWorkout)

    setWorkouts(updatedWorkouts)
    setTimeout(() => fetchWorkouts(), 1000)
  }

  const [editingExerciseId, setEditingExerciseId] = useState(null)
  const toggleVisibility = (exercise) => {
    if(editingExerciseId === exercise.id){
      setEditingExerciseId(null)
    }
    else{ // editing mode
      setEditingExerciseId(exercise.id)

      setExerciseName(exercise.name)
      setSets(exercise.sets)
      setReps(exercise.reps)
      setWeight(exercise.weight)
    }
  }

  return(
    <>
      <h1>My Workouts</h1>
      {
      workouts.length === 0 ? <p>Nothing here...</p>
      :
      workouts.map(w => {
        return(
          <div className='workout' key={w.name}>
            <h2>{w.name}<button onClick={(event) => handleDeleteWorkout(event, w.id)}>Delete</button></h2>
                {w.exercises.map((e, index) => {
                  return(
                    <div key={e.name}>
                      <table>
                        <tbody>
                          <tr key={index}>
                            <td>{e.name}</td>
                            <td>{e.sets} x {e.reps}</td>
                            <td>{e.weight} lbs</td>
                            <td><button onClick={() => toggleVisibility(e)}>{editingExerciseId === e.id ? 'Cancel' : 'Edit'}</button></td>
                            <td><button onClick={(event) => handleDeleteExercise(event, w.id, e.id)}>Delete</button></td>
                          </tr>
                        </tbody>
                      </table>
                      {editingExerciseId === e.id && (
                        <form onSubmit={(event) => handleEditExercise(event, w.id, e.id)}>
                          <ExerciseInput exerciseName={exerciseName} setExerciseName={setExerciseName}
                          sets={sets} setSets={setSets}
                          reps={reps} setReps={setReps}
                          weight={weight} setWeight={setWeight} />
                          <button type='submit'>Update</button>
                        </form>
                      )}
                    </div>
                  )
                })}
          </div>
        )
      })}
    </>
  )
}

export default Workouts