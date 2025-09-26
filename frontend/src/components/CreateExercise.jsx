import styled from 'styled-components'
import { MdAdd } from 'react-icons/md'

import { useState } from 'react'
import exerciseService from '../services/exercises'

import ExerciseInput from './ExerciseInput'
import Notification from './Notification'

// styles
const Container = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: transparent;
  border-radius: 16px;
  padding: 24px;
  padding-bottom: 40px;
`

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: row;
`

const Selector = styled.select`
  width: 97%;
  margin-left: 4px;
  margin-right: 8px;
  margin-bottom: 4px;
  padding: 8px;
  background: white;
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
  background: white;
  font-size: 20px;
  transition: 0.3s;

  &:hover{
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    animation: gradient 15s ease infinite;
  }
`

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
    <Container>
      <h2 style={{ color: 'white', textShadow: '1px 1px 5px black', marginBottom: 8, paddingRight: 28 }}>New Exercise</h2>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <div>
          <Selector defaultValue={''} onChange={ ({ target }) => setWorkoutId(target.value) }>
            <option value=''>Select a Workout</option>
            {workouts.map(w => <option key={ w.id } value={ w.id }>{ w.name }</option>)}
          </Selector>

          <ExerciseInput exerciseName={exerciseName} setExerciseName={setExerciseName}
          sets={sets} setSets={setSets}
          reps={reps} setReps={setReps}
          weight={weight} setWeight={setWeight} />
        </div>
        <Button type='submit'><MdAdd style={{ fontSize: 20 }} /></Button>
      </Form>
      <Notification message={notificationMessage} />
    </Container>
  )
}

export default CreateExercise