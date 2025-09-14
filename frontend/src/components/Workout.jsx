import { useState } from 'react'
import userService from '../services/users'
import ExerciseInput from './ExerciseInput'

import Togglable from './Togglable'

const Workout = ({ currentUser, setCurrentUser, workouts, setWorkouts }) => {
  const handleDeleteWorkout = async (id) => { // needs update before deleting recently added workout
    const user = await userService.getOne(currentUser.id)
    
    const updatedWorkouts = user.workouts.filter(w => w._id !== id)
    const updatedUser = {
      ...user,
      workouts: updatedWorkouts
    }

    await userService.update(user.id, updatedUser)
    setCurrentUser(updatedUser)
    setWorkouts(updatedWorkouts)
    console.log(`delete workout ${id}`);
  }

  const handleDeleteExercise = async (event, workoutId, exerciseId) => { // needs update before deleting recently added workout
    event.preventDefault()
    const user = await userService.getOne(currentUser.id)
    
    const workout = user.workouts.find(w => w._id === workoutId)
    const updatedExercises = workout.exercises.filter(e => e._id !== exerciseId)
    workout.exercises = updatedExercises   
    
    const updatedWorkouts = user.workouts.map(w => w._id !== workoutId ? w : workout)
    const updatedUser = {
      ...user,
      workouts: updatedWorkouts
    }

    await userService.update(user.id, updatedUser)
    setCurrentUser(updatedUser)
    setWorkouts(updatedWorkouts)
    console.log(`delete exercise ${exerciseId}`);
  }

  const [exerciseName, setExerciseName] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')

  const handleEditExercise = async (event, workoutId, exerciseId) => {
    event.preventDefault()
    const user = await userService.getOne(currentUser.id)
    
    const workout = user.workouts.find(w => w._id === workoutId)
    const exercise = workout.exercises.find(e => e._id === exerciseId)
    
    const updatedExercise = {
      ...exercise,
      name: exerciseName,
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: parseInt(weight)
    }

    const updatedWorkout = {
      ...workout,
      exercises: workout.exercises.map(e => e._id !== exerciseId ? e : updatedExercise)
    }

    const updatedUser = {
      ...user,
      workouts: user.workouts.map(w => w._id !== workoutId ? w : updatedWorkout)
    }

    await userService.update(user.id, updatedUser)
    toggleVisibility(updatedExercise)

    setCurrentUser(updatedUser)
    setWorkouts(updatedUser.workouts)
  }

  // need to figure out how to change the visiblity of each individual exercise toggle, not all at once
  const [editingExerciseId, setEditingExerciseId] = useState(null)
  const toggleVisibility = (exercise) => {
    if(editingExerciseId === exercise._id){
      setEditingExerciseId(null)
    }
    else{ // editing mode
      setEditingExerciseId(exercise._id)

      setExerciseName(exercise.name)
      setSets(exercise.sets)
      setReps(exercise.reps)
      setWeight(exercise.weight)
    }
  }

  return(
    <>
      {workouts.map(w => {
        return(
          <div key={w.name}>
            <h1>{w.name}<button onClick={() => handleDeleteWorkout(w._id)}>Delete</button></h1>
                {w.exercises.map((e, index) => {
                  return(
                    <div key={e.name}>
                      <table>
                        <tbody>
                          <tr key={index}>
                            <td>{e.name}</td>
                            <td>{e.sets} x {e.reps}</td>
                            <td>{e.weight} lbs</td>
                            <td><button onClick={() => toggleVisibility(e)}>{editingExerciseId === e._id ? 'Cancel' : 'Edit'}</button></td>
                            <td><button onClick={(event) => handleDeleteExercise(event, w._id, e._id)}>Delete</button></td>
                          </tr>
                        </tbody>
                      </table>
                      {editingExerciseId === e._id && (
                        <form onSubmit={(event) => handleEditExercise(event, w._id, e._id)}>
                          <ExerciseInput exerciseName={exerciseName} setExerciseName={setExerciseName}
                          sets={sets} setSets={setSets}
                          reps={reps} setReps={setReps}
                          weight={weight} setWeight={setWeight} />
                          {/* origName={e.name} origSets={e.sets} origReps={e.reps} origWeight={e.weight} */}
                          <button type='submit'>Update</button>
                        </form>
                      )}
                      {/* <Togglable visible={visible} buttonLabel={'Edit'}>
                        
                      </Togglable> */}
                    </div>
                  )
                })}
          </div>
        )
      })}
    </>
  )
}

export default Workout