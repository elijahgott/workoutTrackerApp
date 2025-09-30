import styled from 'styled-components'
import { MdOutlineSortByAlpha, MdDateRange } from 'react-icons/md'

import { useState } from 'react'

import Workout from './Workout'

// styles
const Container = styled.div`
  margin: 16px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 8px;
`

const Input = styled.input`
  padding: 8px;
  margin: 4px;
  border: none;
  border-bottom: 2px solid black;
`

const InputDark = styled.input`
  padding: 8px;
  margin: 4px;
  border: none;
  border-bottom: 2px solid white;
  background-color: rgb(25, 25, 25);
  color: white;

  &::placeholder{
    color: white;
  }
`

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
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

const Workouts = ({ fetchWorkouts, currentUser, workouts, setWorkouts, isDark }) => {
  const [notificationMessage, setNotificationMessage] = useState(null)

  const [searchFor, setSearchFor] = useState('')
  const [sortType, setSortType] = useState('None')

  const sortedWorkouts = workouts.toSorted((a, b) => a.name.localeCompare(b.name))

  const handleChangeSortType = () => {
    if(sortType === 'None'){
      setSortType('A-Z')
    }
    else{
      setSortType('None')
    }
  }

  return(
    <Container>
      <h2 style={{ marginTop: 16, marginLeft: 8 }}>My Workouts</h2>
      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 8, marginBottom: 8, marginLeft: 4 }}>
        { isDark ? 
          <InputDark type='text' value={searchFor} onChange={({ target }) => setSearchFor(target.value)} placeholder='Search Workouts' />
          :
          <Input type='text' value={searchFor} onChange={({ target }) => setSearchFor(target.value)} placeholder='Search Workouts' />
        }
        
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <label htmlFor='sortBtn'>Sort:</label>
          <Button style={ isDark ? { marginLeft: 4 } : { marginLeft: 4 }} id='sortBtn' onClick={handleChangeSortType}>{sortType === 'None' ? <MdDateRange style={ isDark ? { fontSize: 20, color: 'white' } : { fontSize: 20, color: 'black' }} /> : <MdOutlineSortByAlpha style={ isDark ? { fontSize: 20, color: 'white' } : { fontSize: 20, color: 'black' }} />}</Button>
        </div>
      </div>
  
      {
      workouts.length === 0 ? <p style={{ textAlign: 'center', color: 'gray', paddingTop: 8 }}>Nothing here...</p>
      :
      <Grid>
        {sortType === 'None' 
        ? workouts.filter(w => w.name.toLowerCase().includes(searchFor.toLowerCase())).map(w => {
          return(
            <Workout key={w.name} isDark={isDark} workout={w} workouts={workouts} setWorkouts={setWorkouts} currentUser={currentUser} setNotificationMessage={setNotificationMessage} fetchWorkouts={fetchWorkouts} />
          )
        })
        : sortedWorkouts.filter(w => w.name.toLowerCase().includes(searchFor.toLowerCase())).map(w => {
          return(
            <Workout key={w.name} isDark={isDark} workout={w} workouts={workouts} setWorkouts={setWorkouts} currentUser={currentUser} notificationMessage={notificationMessage} setNotificationMessage={setNotificationMessage} fetchWorkouts={fetchWorkouts} />
          )
        })}
        </Grid>
      }
    </Container>
  )
}

export default Workouts