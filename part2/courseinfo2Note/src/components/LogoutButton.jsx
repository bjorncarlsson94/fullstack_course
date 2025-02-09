const LogoutButton = ({ setUser }) => {
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')

    setUser(null)
  }
  return (
    <button type="submit" onClick={handleLogout}>
      Logout
    </button>
  )
}
export default LogoutButton
