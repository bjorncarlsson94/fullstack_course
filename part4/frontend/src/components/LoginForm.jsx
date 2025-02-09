import { useState } from 'react'
import loginService from '../services/loginService'
import blogService from '../services/blogService'

const LoginForm = ({ setUser, setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong Credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div style={{ marginRight: '25px' }}>
        Username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        ></input>
      </div>
      <div style={{ marginRight: '25px' }}>
        Password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        ></input>
      </div>
      <button type="submit">Login</button>
    </form>
  )
}
export default LoginForm
