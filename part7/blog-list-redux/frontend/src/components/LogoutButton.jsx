import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutUser())
    navigate('/login')
  }
  return (
    <Button variant="outline" type="submit" onClick={handleLogout}>
      Logout
    </Button>
  )
}
export default LogoutButton
