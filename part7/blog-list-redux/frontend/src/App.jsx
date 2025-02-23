import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import BlogForm from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog, likeBlog } from './reducers/blogReducer'
import { addNotification } from './reducers/notificationReducer'

function App() {
  // const [user, setUser] = useState(null)
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
  }, [])

  const blogs = useSelector(({ blogs }) => {
    if (!!blogs) {
      return blogs
    }
    return []
  })

  const sortBlogs = () => {
    let sortedBlogs = [...blogs.sort((a, b) => b.likes - a.likes)]
    //setBlogs(sortedBlogs) //(prevBlogs) => [...prevBlogs].sort((a, b) => b.likes - a.likes))
  }

  const createBlogEntry = (blogObject) => {
    dispatch(createBlog(blogObject))
  }
  const updateBlogLikes = (blogToUpdate) => {
    dispatch(likeBlog(blogToUpdate))
    dispatch(addNotification(`You've liked: ${blogToUpdate.title}`, 5))
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {!user?.token ? (
        <LoginForm />
      ) : (
        <div>
          {user.name} logged in
          <LogoutButton />
          <Togglable buttonLabel={'Add new blog'} ref={blogFormRef}>
            <BlogForm
              blogFormRef={blogFormRef}
              createBlogEntry={createBlogEntry}
            />
          </Togglable>
          <button style={{ margin: '5px' }} onClick={sortBlogs}>
            Sort Blogs
          </button>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              updateBlogLikes={updateBlogLikes}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
