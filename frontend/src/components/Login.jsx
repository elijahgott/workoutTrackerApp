import { useState } from 'react'
import loginService from '../services/login'

const Login = ({ setCurrentUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(`logging in with: ${username}, ${password}`)

    try{
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedInWorkoutAppUser', JSON.stringify(user)
      )
      setCurrentUser(user)
      setUsername('')
      setPassword('')
    }
    catch{
      console.error('Wrong credentials')
    }
  }

  const handleCreateUser = () => {
    console.log('create user')
  }
  return(
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="text" value={username} onChange={({target}) => setUsername(target.value)} placeholder="Username:" />
        <input type="password" value={password} onChange={({target}) => setPassword(target.value)} placeholder="Password:" />
        <button type="submit" >Log In</button>
      </form>

      <h1>Create Account</h1>
      <form onSubmit={handleCreateUser}>
        <button type="submit" >Create Account</button>
      </form>
    </>
  )
}

export default Login