import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'

const LogoutButton = ({ setUser, setUsername, setPassword }) => {
  const dispatch = useDispatch()

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }
  return (
    <div style={{ margin: '5px' }}>
      <button type="submit" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}
export default LogoutButton
