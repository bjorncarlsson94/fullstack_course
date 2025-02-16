import { useSelector, useDispatch } from 'react-redux'
import { addVote, sortAnecdotes } from '../reducers/anecdoteReducer'
import {
  alertNotification,
  removeNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (!filter) {
      return anecdotes
    } else {
      return anecdotes.filter((anecdote) => {
        return anecdote.content.toLowerCase().includes(filter.toLowerCase())
      })
    }
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(alertNotification(`You voted for: ${anecdote.content}`))
    setTimeout(() => dispatch(removeNotification(null)), 5000)
  }
  const sortAnecdotesList = (event) => {
    event.preventDefault()
    dispatch(sortAnecdotes())
  }
  return (
    <div>
      <button onClick={sortAnecdotesList} style={{ marginBottom: '15px' }}>
        Sort
      </button>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}
export default AnecdoteList
