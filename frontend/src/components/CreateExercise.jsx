import styled from 'styled-components'
import { MdAdd } from 'react-icons/md'

import { useState } from 'react'
import exerciseService from '../services/exercises'

import ExerciseInput from './ExerciseInput'
import Notification from './Notification'

// styles
const Container = styled.div`
  display: flex;
  padding: 24px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: transparent;
`

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Selector = styled.select`
  display: flex;
  width: 98%;
  margin: 4px;
  padding: 8px;
  border: 1px solid white;
  border-radius: 8px;
`

const Button = styled.button`
  aspect-ratio: 1 / 1;
  height: 100%;
  max-height: 28px;
  max-width: 28px;
  padding: 4px;
  margin: 4px;
  border: none;
  border-radius: 50%;
  font-size: 20px;
  transition: 0.3s;

  &:hover{
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    animation: gradient 15s ease infinite;
  }
`

const CreateExercise = ({ fetchWorkouts, currentUser, workouts, setWorkouts, isDark }) => {
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
    <Container>
      <h2 style={ isDark ? { color: 'black', marginTop: 12, marginBottom: 8, backgroundColor: 'transparent' } : { color: 'white', textShadow: '1px 1px 5px black', marginBottom: 8, backgroundColor: 'transparent' }}>New Exercise</h2>
      <Form style={{ backgroundColor: 'transparent' }} onSubmit={(event) => handleSubmit(event)}>
        <div style={{ backgroundColor: 'transparent', width: '100%' }}>
          <Selector style={ isDark ? {color: 'white', backgroundColor: 'rgb(25, 25, 25)', border: '1px solid black' } : {} } defaultValue={''} onChange={ ({ target }) => setWorkoutId(target.value) }>
            <option value=''>Select a Workout</option>
            {workouts.map(w => <option key={ w.id } value={ w.id }>{ w.name }</option>)}
          </Selector>

          <ExerciseInput style={{ backgroundColor: 'transparent' }} isDark={isDark} exerciseName={exerciseName} setExerciseName={setExerciseName}
          sets={sets} setSets={setSets}
          reps={reps} setReps={setReps}
          weight={weight} setWeight={setWeight} />
        </div>
        <Button style={ isDark ? { backgroundColor: 'rgb(25, 25, 25)' } : { backgroundColor: 'white' } } type='submit'><MdAdd style={ isDark ? { fontSize: 20, color: 'white' } : { fontSize: 20, color: 'black' }} /></Button>
      </Form>
      <Notification isDark={ isDark } message={ notificationMessage } />
    </Container>
  )
}

export default CreateExercise