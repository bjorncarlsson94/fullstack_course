import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import BlogForm from './components/newBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const sortBlogs = () => {
    setBlogs((prevBlogs) => [...prevBlogs].sort((a, b) => b.likes - a.likes))
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {!user ? (
        <LoginForm setUser={setUser} setMessage={setMessage} />
      ) : (
        <div>
          {user.name} logged in
          <LogoutButton setUser={setUser} />
          <Togglable buttonLabel={'Add new blog'} ref={blogFormRef}>
            <BlogForm
              setBlogs={setBlogs}
              blogs={blogs}
              setMessage={setMessage}
              blogFormRef={blogFormRef}
            />
          </Togglable>
          <button style={{ margin: '5px' }} onClick={sortBlogs}>
            Sort Blogs
          </button>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} setBlogs={setBlogs} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
