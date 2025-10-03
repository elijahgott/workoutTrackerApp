import styled from 'styled-components'
import { MdAdd } from 'react-icons/md'

import { useState } from 'react'
// import userService from '../services/users'
import workoutService from '../services/workouts'

import Notification from './Notification'

// styles
const Container = styled.div`
  padding: 28px;
  display: flex;
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

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 4px;
  border: 1px solid white;
  border-radius: 8px;
`

const InputDark = styled.input`
  width: 100%;
  padding: 8px;
  margin: 4px;
  border: 1px solid black;
  border-radius: 8px;
  background-color: rgb(25, 25, 25);
  color: white;

  &::placeholder{
    color: white;
  }
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
  }
`

const CreateWorkout = ({ isDark, fetchWorkouts, currentUser, workouts, setWorkouts }) => {
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
    <Container>
      <h2 style={ isDark ? { color: 'black', marginBottom: 8, backgroundColor: 'transparent' } : { color: 'white', textShadow: '1px 1px 5px black', marginBottom: 8, backgroundColor: 'transparent' }}>New Workout</h2>
      <Form style={{ backgroundColor: 'transparent' }} onSubmit={handleSubmit}>
        { isDark ?
          <InputDark id='workoutname' name="workoutname" type="text" value={workoutName} onChange={({target}) => setWorkoutName(target.value)} placeholder="Workout Name (e.g. Legs)" minLength={3} required />
          :
          <Input id='workoutname' name="workoutname" type="text" value={workoutName} onChange={({target}) => setWorkoutName(target.value)} placeholder="Workout Name (e.g. Legs)" minLength={3} required />
        }
        <Button style={ isDark ? { backgroundColor: 'rgb(25, 25, 25)' } : { backgroundColor: 'white' } } type="submit"><MdAdd style={ isDark ? { fontSize: 20, color: 'white' } : { fontSize: 20, color: 'black' }}/></Button>
      </Form>
      <Notification isDark={ isDark } message={notificationMessage} />
    </Container>
  )
}

export default CreateWorkout