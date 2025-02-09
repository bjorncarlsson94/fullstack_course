import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import BlogForm from './components/newBlog'
import Notification from './components/Notification'

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

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

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {!user ? (
        <LoginForm
          setUsername={setUsername}
          username={username}
          password={password}
          setPassword={setPassword}
          setUser={setUser}
          setMessage={setMessage}
        />
      ) : (
        <div>
          {user.name} logged in
          <LogoutButton
            setUser={setUser}
            setUsername={setUsername}
            setPassword={setPassword}
          />
          <BlogForm setBlogs={setBlogs} blogs={blogs} setMessage={setMessage} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
