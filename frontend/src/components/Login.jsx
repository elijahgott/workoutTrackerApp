import { useState } from 'react'
import loginService from '../services/login'
import userService from '../services/users'

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
    <>
      {showLogin ? 
        (
          <>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
              <input type="text" value={username} onChange={({target}) => setUsername(target.value)} placeholder="Username:" />
              <input type="password" value={password} onChange={({target}) => setPassword(target.value)} placeholder="Password:" />
              <button type="submit" >Log In</button>
            </form>
            <button onClick={() => setShowLogin(!showLogin)}>New User?</button>
          </>
        )
        : (
          <>
            <h1>Create Account</h1>
            <form onSubmit={handleCreateUser}>
              <input type="text" value={newUsername} onChange={({target}) => setNewUsername(target.value)} placeholder="Username:" />
              <input type="password" minLength={4} value={newPassword} onChange={({target}) => setNewPassword(target.value)} placeholder="Password:" />
              <button type="submit" >Create Account</button>
            </form>
            <button onClick={() => setShowLogin(!showLogin)}>Returning User?</button>
          </>
        )
      }
    </>
  )
}

export default Login