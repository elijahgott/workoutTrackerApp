import { useState, useEffect } from 'react'
// import { Routes, Route } from 'react-router'

import userService from './services/users'

import NavigationBar from './components/NavigationBar'
import Login from './components/Login'
import Home from './components/Home'
// import CreateNew from './components/CreateNew'

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  // get currently logged in user
  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUserJSON = window.localStorage.getItem('loggedInWorkoutAppUser')
      if(loggedInUserJSON){
        const userWithToken = JSON.parse(loggedInUserJSON)
        const user = await userService.getOne(userWithToken.id)
        setCurrentUser(user)
      }
    }
    fetchUser()
  }, [])

  // get workouts / exercises from db whenever updated
  // should fix issue where user cant delete instantly after creating
  useEffect(() => {

  }, [])

  if(!currentUser){
    return(<Login setCurrentUser={setCurrentUser} />)
  }

  return (
    <>
      <NavigationBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Home currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </>
  )
}

export default App
