import styled from 'styled-components'

import { useState } from 'react'
import loginService from '../services/login'
import userService from '../services/users'

const ContainerBorder = styled.div`
  margin: 24px auto;
  background: linear-gradient(90deg,rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%);
  width: 90%;
  max-width: 600px;
  padding: 4px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  border-radius: 16px;
  padding: 48px;
`

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Input = styled.input`
  padding: 4px;
  margin: 4px;
  border: none;
  border-bottom: 2px solid black;
`

const Button = styled.button`
  border: none;
  border-radius: 8px;
  background-color: transparent;
  padding: 8px;
  margin: 4px;
  width: fit-content;
  font-weight: bold;
  transition: 0.3s;

  &:hover{
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`

const Login = ({ setCurrentUser }) => {
  const [showLogin, setShowLogin] = useState(true)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try{
      const loggedInUser = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedInWorkoutAppUser', JSON.stringify(loggedInUser)
      )

      const user = await userService.getOne(loggedInUser.id)
      setCurrentUser(user)
      setUsername('')
      setPassword('')
    }
    catch{
      console.error('Wrong credentials')
    }
  }

  const handleCreateUser = async (event) => {
    event.preventDefault()
    
    if(newUsername && newPassword){
      const newUser = {
        username: newUsername,
        password: newPassword
      }

      const createUser = await userService.create(newUser)
      if(createUser){
        setTimeout(async () => { // delay to give DB time to update
          const loggedInUser = await loginService.login({ username: newUsername, password: newPassword })
          window.localStorage.setItem(
            'loggedInWorkoutAppUser', JSON.stringify(loggedInUser)
          )

          const user = await userService.getOne(loggedInUser.id)
          setCurrentUser(user)
          setNewUsername('')
          setNewPassword('')
        }, 2000)
      }
    }
    else{
      console.error('Invalid username or password.')
    }
  }

  return(
    <ContainerBorder>
      {showLogin ? 
        (
          <Container>
            <h1>Login</h1>
            <Form onSubmit={handleLogin}>
              <Input type="text" value={username} onChange={({target}) => setUsername(target.value)} placeholder="Username:" />
              <Input type="password" value={password} onChange={({target}) => setPassword(target.value)} placeholder="Password:" />
              <Button type="submit" >Log In</Button>
            </Form>
            <Button onClick={() => setShowLogin(!showLogin)}>New User?</Button>
          </Container>
        )
        : (
          <Container>
            <h1>Create Account</h1>
            <Form onSubmit={handleCreateUser}>
              <Input type="text" value={newUsername} onChange={({target}) => setNewUsername(target.value)} placeholder="Username:" />
              <Input type="password" minLength={4} value={newPassword} onChange={({target}) => setNewPassword(target.value)} placeholder="Password:" />
              <Button type="submit" >Create Account</Button>
            </Form>
            <Button onClick={() => setShowLogin(!showLogin)}>Returning User?</Button>
          </Container>
        )
      }
    </ContainerBorder>
  )
}

export default Login