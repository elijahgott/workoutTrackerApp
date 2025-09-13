import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'

// import userService from './services/users' // need for getting data from backend

import NavigationBar from './components/NavigationBar'
import Login from './components/Login'
import Home from './components/Home'
import CreateNew from './components/CreateNew'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  // const [workouts, setWorkouts] = useState(null)

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInWorkoutAppUser')
    if(loggedInUserJSON){
      const user = JSON.parse(loggedInUserJSON)
      setCurrentUser(user)
    }
  }, [])

  if(!currentUser){
    return(<Login setCurrentUser={setCurrentUser} />)
  }

  return (
    <>
      <NavigationBar setCurrentUser={setCurrentUser} />
      <Routes>
        <Route index element={<Home currentUser={currentUser} />} />
        <Route path='create' element={<CreateNew currentUser={currentUser} />} />
      </Routes>
    </>
  )
}

export default App
