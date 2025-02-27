import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import { AppBar, Button, IconButton, Toolbar } from '@mui/material'

const NavigationMenu = () => {
  const user = useSelector((state) => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      return loggedUser
    }
    return state.user.user
  })
  const padding = {
    padding: 5,
    margin: 5,
  }
  const banner = {
    background: 'lightgrey',
    border: 'solid black 1px',
    borderRadius: '5px',
    paddingTop: '5px',
    paddingBottom: '5px',
  }
  return (
    <AppBar position={'static'} sx={{ borderRadius: 10 }}>
      <Toolbar
        variant="regular"
        sx={{
          border: 1,
          borderRadius: 10,
          justifyContent: 'center',
        }}
      >
        <IconButton edge="start" color="default" aria-label="menu"></IconButton>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        <Button color="inherit" component={Link} to="/">
          Blogs
        </Button>
        <Button
          color="inherit"
          component={Link}
          align="right"
          to={user === undefined ? '/login' : '/'}
        >
          {user === undefined ? (
            'Login'
          ) : (
            <>
              {user?.name} is logged in <LogoutButton />
            </>
          )}
        </Button>
      </Toolbar>
    </AppBar>
  )
}
export default NavigationMenu
