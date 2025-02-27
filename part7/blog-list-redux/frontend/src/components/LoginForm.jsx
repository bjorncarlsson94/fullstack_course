import { useState } from 'react'
import { addNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { onLoginUser } from '../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField } from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = dispatch(onLoginUser(username, password))
      setUsername('')
      setPassword('')
      navigate('/')
    } catch (exception) {
      dispatch(addNotification('Wrong Credentials', 5))
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      display="flex"
      flexDirection="column"
      maxWidth="200px"
      gap="15px"
      marginTop="25px"
    >
      <TextField
        data-testid="username"
        type="text"
        value={username}
        name="Username"
        placeholder="Username"
        label="Username"
        onChange={({ target }) => setUsername(target.value)}
      ></TextField>
      <TextField
        data-testid="password"
        type="password"
        value={password}
        name="Password"
        placeholder="Password"
        label="Password"
        onChange={({ target }) => setPassword(target.value)}
      ></TextField>
      <Button variant="contained" type="submit">
        Login
      </Button>
    </Box>
  )
}

export default LoginForm
