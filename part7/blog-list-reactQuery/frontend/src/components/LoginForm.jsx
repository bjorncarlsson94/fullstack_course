import { useState, useContext } from 'react'
import { useDispatch } from 'react-redux'
import NotificationContext from '../contexts/NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import loginService from '../services/loginService'
import blogService from '../services/blogService'

const LoginForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: (response) => {
      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(response))
      blogService.setToken(response.token)
      queryClient.setQueryData(['user'], response)
    },
    onError: (error) => {
      notificationDispatch({
        type: 'addNotification',
        payload: `Wrong Credentials`,
      })
      console.log('error: ', error)
    },
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      loginMutation.mutate({ username, password })

      setUsername('')
      setPassword('')
    } catch (exception) {
      notificationDispatch({
        type: 'addNotification',
        payload: `Wrong Credentials`,
      })
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
