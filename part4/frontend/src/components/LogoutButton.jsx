const LogoutButton = ({ setUser, setUsername, setPassword }) => {
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInBlogUser')

    setUser(null)
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
