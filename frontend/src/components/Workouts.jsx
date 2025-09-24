import styled from 'styled-components'

import { useState } from 'react'

import Notification from './Notification'
import Workout from './Workout'

// styles
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 8px;
`

const Workouts = ({ fetchWorkouts, currentUser, workouts, setWorkouts }) => {
  const [notificationMessage, setNotificationMessage] = useState(null)

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
    <>
      <h1>My Workouts</h1>
      <label htmlFor='sortBtn'>Sort By:<button id='sortBtn' onClick={handleChangeSortType}>{sortType}</button></label>
      <Notification message={notificationMessage} />
      {
      workouts.length === 0 ? <p>Nothing here...</p>
      :
      <Grid>
        {sortType === 'None' 
        ? workouts.map(w => {
          return(
            <Workout key={w.name} workout={w} workouts={workouts} setWorkouts={setWorkouts} currentUser={currentUser} setNotificationMessage={setNotificationMessage} fetchWorkouts={fetchWorkouts} />
          )
        })
        : sortedWorkouts.map(w => {
          return(
            <Workout key={w.name} workout={w} workouts={workouts} setWorkouts={setWorkouts} currentUser={currentUser} setNotificationMessage={setNotificationMessage} fetchWorkouts={fetchWorkouts} />
          )
        })}
        </Grid>
      }
    </>
  )
}

export default Workouts