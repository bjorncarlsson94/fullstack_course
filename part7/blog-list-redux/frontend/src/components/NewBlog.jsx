import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNotification } from '../reducers/notificationReducer'
import { Box, Button, TextField } from '@mui/material'

const BlogForm = ({ blogFormRef, createBlogEntry }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const dispatch = useDispatch()

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
      }
      await createBlogEntry(newBlog)
      blogFormRef.current.toggleVisibility()
      dispatch(addNotification(`Blog: ${title} By: ${author} was added`, 5))
      setTitle('')
      setAuthor('')
      setURL('')
    } catch (error) {
      console.error('Error creating blog:', error)
      dispatch(addNotification('Failed to create blog', 5))
    }
  }
  return (
    <div>
      <h2>Create new blog entry</h2>
      <Box
        component="form"
        onSubmit={(event) => {
          handleBlogCreation(event)
        }}
        alignItems="center"
      >
        <TextField
          label="Title"
          type="text"
          value={title}
          name="title"
          placeholder="Title"
          onChange={({ target }) => setTitle(target.value)}
        ></TextField>
        <TextField
          label="Author"
          type="text"
          value={author}
          name="author"
          placeholder="Author"
          onChange={({ target }) => setAuthor(target.value)}
        ></TextField>
        <TextField
          label="Url"
          type="text"
          value={url}
          name="url"
          placeholder="Url"
          onChange={({ target }) => setURL(target.value)}
        ></TextField>
        <Button variant="contained" style={{ margin: '15px' }} type="submit">
          Post new blog
        </Button>
      </Box>
    </div>
  )
}

export default BlogForm
