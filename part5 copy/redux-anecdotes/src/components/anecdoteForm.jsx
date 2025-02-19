import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    console.log('Adding: ', content)
    dispatch(createAnecdote(content))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    // dispatch(setNotification(`Created: ${content}`))
    // setTimeout(() => dispatch(removeNotification(null)), 5000)
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
