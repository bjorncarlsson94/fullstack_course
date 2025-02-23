import { useDispatch } from 'react-redux'
import { useQueryClient } from '@tanstack/react-query'

const LogoutButton = ({ setUser, setUsername, setPassword }) => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInBlogUser')
    queryClient.setQueryData(['user'], {})
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
