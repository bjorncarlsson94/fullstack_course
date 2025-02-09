import { useState, useEffect } from 'react'
import blogService from '../services/blogService'

const Blog = ({ blog, user, blogs, setBlogs }) => {
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: 'flex',
  }
  const showDelete = user.username === blog.user.username

  const handleLike = async (event) => {
    event.preventDefault()

    const blogToUpdate = { ...blog, user: blog.user.id, likes: likes + 1 }
    try {
      await blogService.update(blogToUpdate)
      setLikes(blogToUpdate.likes)
    } catch (exception) {
      console.log('Failed to update the blog')
    }
  }
  const handleDelete = async (event) => {
    event.preventDefault()
    if (window.confirm(`Do you want to delete: ${blog.title}`)) {
      try {
        await blogService.deleteBlog(blog.id)
        setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== blog.id))
      } catch (exception) {
        console.log('Failed to iniate deletion.')
      }
    }
  }

  const [info, setInfo] = useState(false)
  return (
    <div style={blogStyle}>
      <button
        style={{ marginLeft: '20px', marginRight: '10px' }}
        onClick={() => setInfo(!info)}
      >
        {!info ? 'view' : 'close'}
      </button>
      {!info ? (
        <div>
          {blog.title} {blog.author}
        </div>
      ) : (
        <div>
          <div>{blog.title}</div>
          <div>{blog.author}</div>
          <div>{blog.url}</div>
          <div>
            {likes}
            <button style={{ marginLeft: '15px' }} onClick={handleLike}>
              Like
            </button>
          </div>
          <div>{blog.user.name}</div>
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
