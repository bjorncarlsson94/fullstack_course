const LogoutButton = ({ setUser, setUsername, setPassword }) => {
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')

    setUser(null)
    setUsername('')
    setPassword('')
  }
  return (
    <button type="submit" onClick={handleLogout}>
      Logout
    </button>
  )
}
export default LogoutButton
