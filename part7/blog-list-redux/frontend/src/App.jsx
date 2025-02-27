import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import NewBlog from './components/NewBlog'
import NavigationMenu from './components/NavigationMenu'
import Togglable from './components/Togglable'
import blogService from './services/blogService'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog, likeBlog } from './reducers/blogReducer'
import { addNotification } from './reducers/notificationReducer'
import { Route, Routes, useMatch } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import { initializeUsers } from './reducers/usersReducer'
import { Container } from '@mui/material'

function App() {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const user = useSelector((state) => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(loggedUser.token)
      return loggedUser
    }
    return state.user.user
  })

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])
  const blogs = useSelector(({ blogs }) => {
    if (!!blogs) {
      return blogs
    }
    return []
  })
  const users = useSelector(({ users }) => {
    if (!!users) {
      return users
    }
    return []
  })

  const createBlogEntry = (blogObject) => {
    dispatch(createBlog(blogObject))
  }
  const updateBlogLikes = (blogToUpdate) => {
    dispatch(likeBlog(blogToUpdate))
    dispatch(addNotification(`You've liked: ${blogToUpdate.title}`, 5))
  }

  const matchUser = useMatch('/users/:id')
  const matchedUser = matchUser
    ? users.find((u) => {
        return u.id === matchUser.params.id
      })
    : null
  const matchBlog = useMatch('/blogs/:id')
  const matchedBlog = matchBlog
    ? blogs.find((b) => {
        return b.id === matchBlog.params.id
      })
    : null

  return (
    <Container>
      <NavigationMenu />
      {!user ? (
        <>
          <Routes>
            <Route path="/login" element={!user ? <LoginForm /> : null} />
          </Routes>
        </>
      ) : (
        <div>
          <Notification />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h2>Blogs</h2>
                  <Togglable buttonLabel={'Add new blog'} ref={blogFormRef}>
                    <NewBlog
                      blogFormRef={blogFormRef}
                      createBlogEntry={createBlogEntry}
                    />
                  </Togglable>
                  <Blogs blogs={blogs} user={user} />
                </>
              }
            />
            <Route
              path="/blogs/:id"
              element={
                <Blog
                  //key={matchedBlog.id}
                  blog={matchedBlog}
                  user={user}
                  updateBlogLikes={updateBlogLikes}
                />
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User user={matchedUser} />} />
          </Routes>
        </div>
      )}
    </Container>
  )
}

export default App
