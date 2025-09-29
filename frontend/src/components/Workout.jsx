import styled from 'styled-components'
import { MdDeleteOutline, MdCheck, MdOutlineEdit, MdOutlineCancel } from 'react-icons/md'

import { useState } from 'react'
import userService from '../services/users'
import workoutService from '../services/workouts'
import exerciseService from '../services/exercises'

import ExerciseInput from './ExerciseInput'

const WorkoutBorder = styled.div`
  background: linear-gradient(90deg,rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%);
  padding: 4px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transition: 0.3s;
`

const StyledWorkout = styled.div`
  border-radius: 16px;
  background-color: white;
  padding: 16px;
  height: 100%;
  transition: 0.3s;
`

const StyledExercise = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
`

const Form = styled.form`
  margin-top: 4px;
  padding: 8px;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg,rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%);
  border-radius: 8px;
`

const Button = styled.button`
  aspect-ratio: 1 / 1;
  height: 100%;
  max-height: 28px;
  max-width: 28px;
  padding: 4px;
  border: none;
  border-radius: 50%;
  background-color: white;
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
    <WorkoutBorder>
      <StyledWorkout>
        <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'underline' }}>{workout.name}<Button onClick={(event) => handleDeleteWorkout(event, workout.id)}><MdDeleteOutline style={{ fontSize: 20, color: 'black' }} /></Button></h2>
        {workout.exercises.map((e, index) => {
          return(
            <StyledExercise key={e.name}>
              <div style={{ display: 'flex'}}>
                <div style={{ display: 'grid', gridTemplateColumns: '33% 33% 33%', width: '80%', marginRight: 8 }} key={index}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                    <p><strong>{e.name}</strong></p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ margin: '0 auto' }}>{e.sets} x {e.reps}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ marginRight: 0, marginLeft: 'auto' }}>{e.weight} lbs</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'right'}}>
                  <Button onClick={() => toggleVisibility(e)}>{editingExerciseId === e.id ? <MdOutlineCancel style={{ fontSize: 20, color: 'black' }} /> : <MdOutlineEdit style={{ fontSize: 20, margin: 0 }} />}</Button>
                  <Button onClick={(event) => handleDeleteExercise(event, workout.id, e.id)}><MdDeleteOutline style={{ fontSize: 20, margin: 0, color: 'black' }}/></Button>
                </div>
              </div>
      
              {editingExerciseId === e.id && (
                <Form onSubmit={(event) => handleEditExercise(event, workout.id, e.id)}>
                  <ExerciseInput exerciseName={exerciseName} setExerciseName={setExerciseName}
                  sets={sets} setSets={setSets}
                  reps={reps} setReps={setReps}
                  weight={weight} setWeight={setWeight} />
                  <Button style={{ margin: '4px auto' }} type='submit'><MdCheck style={{ fontSize: 20 }} /></Button>
                </Form>
              )}
            </StyledExercise>
          )
        })}
      </StyledWorkout>
    </WorkoutBorder>
  )
}

export default Workout