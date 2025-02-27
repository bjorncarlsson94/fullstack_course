import { useState, useEffect } from 'react'
import { deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { addNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'

const Blogs = ({ blog, user, mockHandler, updateBlogLikes }) => {
  const [info, setInfo] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: 'flex',
  }
  let showDelete = !!blog.user ? user.username === blog.user.username : false

  const handleDelete = async (event) => {
    event.preventDefault()
    if (window.confirm(`Do you want to delete: ${blog.title}`)) {
      try {
        dispatch(deleteBlog(blog))
        dispatch(addNotification('Blog deleted', 5))
      } catch (exception) {
        console.log('Failed to iniate deletion.')
      }
    }
  }

  return (
    <TableContainer component={Paper}>
      <div style={blogStyle} className="blog">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
        <div id="blog-info" className="blogInfo"></div>
      </div>
    </TableContainer>
  )
}
export default Blogs
