import styled from 'styled-components'
import { MdDeleteOutline, MdCheck, MdOutlineEdit, MdOutlineCancel } from 'react-icons/md'

import { useState } from 'react'
import userService from '../services/users'
import workoutService from '../services/workouts'
import exerciseService from '../services/exercises'

import ExerciseInput from './ExerciseInput'

const StyledWorkout = styled.div`
  border: 4px solid black;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  padding: 8px;
`

const Button = styled.button`
  aspect-ratio: 1 / 1;
  height: 100%;
  padding: 4px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  font-size: 16px;
  transition: 0.3s;

  &:hover{
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`

const Workout = ({ workout, workouts, setWorkouts, currentUser, setNotificationMessage, fetchWorkouts }) => {
  const handleDeleteWorkout = async (event, workoutId) => {
    event.preventDefault()

    const workout = await workoutService.getOne(workoutId)
    const exercisesToRemove = workout[0].exercises
    if(window.confirm(`Are you sure you want to delete workout: ${workout[0].name}?`)){
      const deleteWorkout = await workoutService.deleteById(workoutId)
      if(deleteWorkout.status !== 204){
        setNotificationMessage('Error deleting workout.')

        setTimeout(() => setNotificationMessage(null), 3000)
      }
      const user = await userService.getOne(currentUser.id)
      user.workouts = user.workouts.filter(w => w !== workoutId)
      await userService.update(user.id, user)

      const updatedWorkouts = workouts.filter(w => w.id !== workoutId)

      exercisesToRemove.forEach(e => exerciseService.deleteById(e.id))

      setWorkouts(updatedWorkouts)
      setTimeout(() => fetchWorkouts(), 1000)
    }
  }

  const handleDeleteExercise = async (event, workoutId, exerciseId) => {
    event.preventDefault()
    const deleteExercise = await exerciseService.deleteById(exerciseId)
    if(deleteExercise.status !== 204){
      setNotificationMessage('Error deleting exercise.')

      setTimeout(() => setNotificationMessage(null), 3000)
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
    <StyledWorkout>
      <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>{workout.name}<Button onClick={(event) => handleDeleteWorkout(event, workout.id)}><MdDeleteOutline style={{fontSize: 20}} /></Button></h2>
      {workout.exercises.map((e, index) => {
        return(
          <div key={e.name}>
            <table>
              <tbody>
                <tr key={index}>
                  <td>{e.name}</td>
                  <td>{e.sets} x {e.reps}</td>
                  <td>{e.weight} lbs</td>
                  <td><Button onClick={() => toggleVisibility(e)}>{editingExerciseId === e.id ? <MdOutlineCancel style={{ fontSize: 20 }} /> : <MdOutlineEdit style={{ fontSize: 20, margin: 0 }} />}</Button></td>
                  <td><Button onClick={(event) => handleDeleteExercise(event, workout.id, e.id)}><MdDeleteOutline style={{ fontSize: 20, margin: 0 }}/></Button></td>
                </tr>
              </tbody>
            </table>
            {editingExerciseId === e.id && (
              <form onSubmit={(event) => handleEditExercise(event, workout.id, e.id)}>
                <ExerciseInput exerciseName={exerciseName} setExerciseName={setExerciseName}
                sets={sets} setSets={setSets}
                reps={reps} setReps={setReps}
                weight={weight} setWeight={setWeight} />
                <Button type='submit'><MdCheck style={{ fontSize: 20 }} /></Button>
              </form>
            )}
          </div>
        )
      })}
    </StyledWorkout>
  )
}

export default Workout