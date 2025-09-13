import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'

import userService from './services/users'

import NavigationBar from './components/NavigationBar'
import Login from './components/Login'
import Home from './components/Home'
import CreateNew from './components/CreateNew'

function App() {
  const [currentUser, setCurrentUser] = useState(null)

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

  if(!currentUser){
    return(<Login setCurrentUser={setCurrentUser} />)
  }

  return (
    <>
      <NavigationBar setCurrentUser={setCurrentUser} />
      <Routes>
        <Route index element={<Home currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path='create' element={<CreateNew currentUser={currentUser} />} />
      </Routes>
    </>
  )
}

export default App
