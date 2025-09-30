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

const GlobalStyleDark = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif;
    background-color: rgb(25, 25, 25);
  }
`

const AppStyle = styled.div`
  min-height: 100dvh;
  padding: 12px;
  background-color: rgb(255, 255, 255);
`

const AppStyleDark = styled.div`
  min-height: 100dvh;
  padding: 12px;
  background-color: rgb(25, 25, 25);
  color: white;
`

function App() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia(
      "(prefers-color-scheme: dark)"
    )

    if (mq.matches) {
      setIsDark(true)
    }

    // This callback will fire if the perferred color scheme changes without a reload
    mq.addEventListener('change', (event) => setIsDark(event.matches));
  }, [])

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

  if(!currentUser){
    return (
      <>
        { isDark ?
          (
            <>
              <GlobalStyleDark />
              <AppStyleDark>
                <Login setCurrentUser={setCurrentUser} isDark={isDark} />
              </AppStyleDark>
            </>
          )
        :
          (
            <>
              <GlobalStyle />
              <AppStyle>
                <Login setCurrentUser={setCurrentUser} isDark={isDark} />
              </AppStyle>
            </>
          )
        }
      </>
    )
  }

  if( isDark ){
    return (
      <>
        <GlobalStyleDark />
        <AppStyleDark>
          <NavigationBar currentUser={currentUser} setCurrentUser={setCurrentUser} isDark={isDark} />
          <Home currentUser={currentUser} setCurrentUser={setCurrentUser} isDark={isDark} />
        </AppStyleDark>
      </>
    )
  }
  else{
    return (
      <>
        <GlobalStyle />
        <AppStyle>
          <NavigationBar currentUser={currentUser} setCurrentUser={setCurrentUser} isDark={isDark} />
          <Home currentUser={currentUser} setCurrentUser={setCurrentUser} isDark={isDark} />
        </AppStyle>
      </>
    )
  }
}

export default App
