import { useState, useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import NotificationContext from '../contexts/NotificationContext'
import blogService from '../services/blogService'

const Blog = ({ blog, user, mockHandler, updateBlogLikes }) => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const [info, setInfo] = useState(false)
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: 'flex',
  }
  let showDelete = !!blog.user ? user.username === blog.user.username : false

  const handleLike = async (event) => {
    event.preventDefault()
    const blogToUpdate = {
      ...blog,
      user: blog.user.id, //? blog.user.id : blog.user,
      likes: blog.likes + 1,
    }
    try {
      //await blogService.update(blogToUpdate)
      updateBlogLikes(blogToUpdate)
    } catch (exception) {
      console.log('Failed to update the blog')
    }
  }

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (response) => {
      const blogs = queryClient.getQueryData(['blogs']) || []
      const updatedBlogs = blogs.filter(
        (blogToIterate) => blogToIterate.id !== blog.id
      )
      queryClient.setQueryData(['blogs'], updatedBlogs)
    },
  })
  const handleDelete = async (event) => {
    event.preventDefault()
    if (window.confirm(`Do you want to delete: ${blog.title}`)) {
      try {
        // dispatch(deleteBlog(blog))
        deleteBlogMutation.mutate(blog.id)

        notificationDispatch({
          type: 'addNotification',
          payload: 'Blog deleted',
        })
      } catch (exception) {
        console.log('Failed to iniate deletion.')
      }
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <button
        style={{ marginLeft: '20px', marginRight: '10px' }}
        onClick={() => {
          setInfo(!info)
          //mockHandler()
        }}
      >
        {!info ? 'view' : 'close'}
      </button>
      {!info ? (
        <div id="blog-info" className="blogInfo">
          {blog.title} {blog.author}
        </div>
      ) : (
        <div>
          <div>{blog.title}</div>
          <div>{blog.author}</div>
          <div>{blog.url}</div>
          <div>
            {blog.likes} likes
            <button
              style={{ marginLeft: '15px' }}
              onClick={(event) => {
                handleLike(event)
                //mockHandler()
              }}
            >
              Like
            </button>
          </div>
          <div>{/*blog.user.name*/}</div>
          {showDelete ? (
            <button style={{ marginLeft: '15px' }} onClick={handleDelete}>
              Delete blog
            </button>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
