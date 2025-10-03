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

const AddNewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  margin: 20px;
  background: linear-gradient(90deg,rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%);
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`


const Home = ({ currentUser, setCurrentUser, isDark }) => {
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
      <AddNewContainer>
        <CreateWorkout fetchWorkouts={fetchWorkouts} currentUser={currentUser} setCurrentUser={setCurrentUser} workouts={workouts} setWorkouts={setWorkouts} isDark={isDark} />
        {workouts.length === 0 ? null 
        :
        <CreateExercise fetchWorkouts={fetchWorkouts} currentUser={currentUser} setCurrentUser={setCurrentUser} workouts={workouts} setWorkouts={setWorkouts} isDark={isDark} />
        }
      </AddNewContainer>
      <Workouts fetchWorkouts={fetchWorkouts} currentUser={currentUser} workouts={workouts} setWorkouts={setWorkouts} isDark={isDark} />
    </Container>
  )
}

export default Home