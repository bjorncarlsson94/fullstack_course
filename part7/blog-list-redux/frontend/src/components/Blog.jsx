import {
  Box,
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import Comment from './Comment'

const Blog = ({ blog, user, updateBlogLikes }) => {
  const handleLike = async (event) => {
    event.preventDefault()

    const blogToUpdate = { ...blog, user: blog.user.id, likes: blog.likes + 1 }
    try {
      updateBlogLikes(blogToUpdate)
    } catch (exception) {
      console.log('Failed to update the blog')
    }
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          alignItems: 'left',
          marginBottom: '20px',
        }}
      >
        <a href={blog.url}>{blog.url}</a>
        <strong>Added by: {user.name}</strong>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '15px',
          alignItems: 'center',
        }}
      >
        <div style={{ border: 'solid black', padding: '5px' }}>
          {blog.likes}
        </div>
        <Button variant="contained" onClick={handleLike}>
          Like
        </Button>
      </Box>
      <Divider
        sx={{ borderWidth: 1, borderColor: 'black', marginTop: '15px' }}
      />
      <h3>Comments</h3>
      <Comment blog={blog} />
      <TableContainer component={Paper} sx={{ marginTop: '25px' }}>
        <Table>
          <TableBody>
            {blog.comments.length > 0 ? (
              blog.comments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>{comment.content}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>
                  <div>No comments</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Blog
