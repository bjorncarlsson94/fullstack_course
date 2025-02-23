import { useState } from 'react'
import { addNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { onLoginUser } from '../reducers/loginReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = dispatch(onLoginUser(username, password))
      //const user = await loginService.login({ username, password })
      // window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user))
      // blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(addNotification('Wrong Credentials', 5))
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div style={{ marginRight: '25px' }}>
        Username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        ></input>
      </div>
      <div style={{ marginRight: '25px' }}>
        Password
        <input
          data-testid="password"
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
