import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import {
  alertNotification,
  removeNotification,
} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    console.log('Adding: ', content)
    dispatch(addAnecdote(content))
    dispatch(alertNotification(`Created: ${content}`))
    setTimeout(() => dispatch(removeNotification(null)), 5000)
    event.target.reset()
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}
export default AnecdoteForm
