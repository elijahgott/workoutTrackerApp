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

  return(
    <>
      <h1>My Workouts</h1>
      <Notification message={notificationMessage} />
      {
      workouts.length === 0 ? <p>Nothing here...</p>
      :
      <Grid>
        {workouts.map(w => {
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