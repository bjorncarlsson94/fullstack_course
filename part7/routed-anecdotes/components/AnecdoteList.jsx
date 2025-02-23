import { Link } from 'react-router-dom'
import {
  TableBody,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {anecdotes.map((anecdote) => (
            <TableRow key={anecdote.id}>
              <TableCell>
                <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)
export default AnecdoteList
