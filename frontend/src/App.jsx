import styled, { createGlobalStyle } from 'styled-components'

import { useState, useEffect } from 'react'
// import { Routes, Route } from 'react-router'

import userService from './services/users'

import NavigationBar from './components/NavigationBar'
import Login from './components/Login'
import Home from './components/Home'
// import CreateNew from './components/CreateNew'

// styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif;
  }
`

const AppStyle = styled.div`
  height: 100dvh;
  padding: 12px;
`

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
  // done in home, idk if im gonna need it here
  useEffect(() => {

  }, [])

  if(!currentUser){
    return(
      <>
        <GlobalStyle />
        <AppStyle>
          <Login setCurrentUser={setCurrentUser} />
        </AppStyle>
      </>
      
    )
  }

  return (
    <>
      <GlobalStyle />
      <AppStyle>
        <NavigationBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Home currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </AppStyle>
    </>
  )
}

export default App
