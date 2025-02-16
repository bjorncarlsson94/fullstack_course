import { useSelector, useDispatch } from 'react-redux'
import { addVote, sortAnecdotes } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
  }
  const sortAnecdotesList = (event) => {
    event.preventDefault()
    dispatch(sortAnecdotes())
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      <button onClick={sortAnecdotesList} style={{ marginBottom: '15px' }}>
        Sort
      </button>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}
export default AnecdoteList
