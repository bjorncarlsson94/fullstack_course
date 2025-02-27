import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { Box, Button, Container, TextField } from '@mui/material'
import { useState } from 'react'

const Comment = (blog) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(addComment(blog, comment))
    setComment('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: 'flex',
          align: 'center',
          flexDirection: 'row',
          gap: '15px',
        }}
      >
        <TextField
          value={comment}
          variant="outlined"
          size="small"
          name="commentInput"
          type="text"
          placeholder="add comment"
          onChange={(e) => setComment(e.target.value)}
        />
        <Button variant="contained" size="small" type="submit">
          Add comment
        </Button>
      </Box>
    </form>
  )
}

export default Comment
