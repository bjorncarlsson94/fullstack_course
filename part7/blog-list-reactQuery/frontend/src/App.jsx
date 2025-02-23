import { useEffect, useContext, useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Blog from './components/Blog'
import blogService from './services/blogService'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import BlogForm from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog, likeBlog } from './reducers/blogReducer'
import NotificationContext from './contexts/NotificationContext'

function App() {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const userFromCache = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser')
      if (loggedUserJSON) {
        const loggedUser = JSON.parse(loggedUserJSON)
        blogService.setToken(loggedUser.token)
        console.log('Fetched bloguser: ', loggedUser)
        return loggedUser
      }
      return {}
    },
  })

  const user = userFromCache.data

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const sortBlogs = () => {
    let sortedBlogs = [...blogs.sort((a, b) => b.likes - a.likes)]
    //setBlogs(sortedBlogs) //(prevBlogs) => [...prevBlogs].sort((a, b) => b.likes - a.likes))
  }

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (response) => {
      const blogs = queryClient.getQueryData(['blogs']) || []
      queryClient.setQueryData(['blogs'], blogs.concat(response.data))
    },
  })

  const createBlogEntry = (blogObject) => {
    newBlogMutation.mutate(blogObject)
  }
  const newBlogLike = useMutation({
    mutationFn: blogService.update,
    onSuccess: (response) => {
      const blogs = queryClient.getQueryData(['blogs']) || []
      const updatedBlogs = blogs.map((blog) =>
        blog.id === response.id ? { ...response, user: blog.user } : blog
      )
      queryClient.setQueryData(['blogs'], updatedBlogs)
    },
  })

  const updateBlogLikes = (blogToUpdate) => {
    newBlogLike.mutate(blogToUpdate)
    // dispatch(likeBlog(blogToUpdate))
    notificationDispatch({
      type: 'addNotification',
      payload: `You've liked: ${blogToUpdate.title}`,
    })
    // dispatch(addNotification(`You've liked: ${blogToUpdate.title}`, 5))
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 3,
    refetchOnWindowFocus: false,
  })

  if (result.isLoading) {
    return <div>Loading data...</div>
  } else if (result.isError) {
    return <div>There was an error laoding data</div>
  }
  const blogs = result.data

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
