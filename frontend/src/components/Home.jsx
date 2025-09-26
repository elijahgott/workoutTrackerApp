import styled from 'styled-components'

import { useState, useEffect, useCallback } from 'react'
import workoutService from '../services/workouts'

import Workouts from './Workouts'
import CreateWorkout from './CreateWorkout'
import CreateExercise from './CreateExercise'

// styles
const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px; 
`


const Home = ({ currentUser, setCurrentUser }) => {
  const [workouts, setWorkouts] = useState([])

  const fetchWorkouts = useCallback( async () => {
    const allWorkouts = await workoutService.getAll()
    setWorkouts(allWorkouts.filter(w => w.user === currentUser.id))
  }, [currentUser.id])
  
  useEffect(() => {
    fetchWorkouts()
  }, [fetchWorkouts])
  
  return(
    <Container>
      <Workouts fetchWorkouts={fetchWorkouts} currentUser={currentUser} workouts={workouts} setWorkouts={setWorkouts} />
      <CreateWorkout fetchWorkouts={fetchWorkouts} currentUser={currentUser} setCurrentUser={setCurrentUser} workouts={workouts} setWorkouts={setWorkouts} />
      {workouts.length === 0 ? null 
      :
      <CreateExercise fetchWorkouts={fetchWorkouts} currentUser={currentUser} setCurrentUser={setCurrentUser} workouts={workouts} setWorkouts={setWorkouts} />
      }
    </Container>
  )
}

export default Home