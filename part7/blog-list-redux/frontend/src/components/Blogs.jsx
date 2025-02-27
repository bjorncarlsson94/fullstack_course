import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableRow } from '@mui/material'

const Bloggies = ({ blogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    margin: 15,
    display: 'flex',
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell padding="normal">
                <Link to={`/blogs/${blog.id}`} className="blog">
                  {blog.title}, {blog.author}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default Bloggies
