import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  TableRow,
  TableContainer,
  Table,
  Paper,
  TableBody,
  TableCell,
} from '@mui/material'

const Users = () => {
  const users = useSelector(({ users }) => {
    if (!!users) {
      return users
    }
    return []
  })

  if (users.length === 0) {
    return <div>No users...</div>
  }

  return (
    <>
      <h2>Users: </h2>
      <strong>Blogs created</strong>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell align="left">
                  <div>{user.blogs.length}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Users
