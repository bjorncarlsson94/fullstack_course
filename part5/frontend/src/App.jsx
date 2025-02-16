import NewNote from './components/newNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/visibilityFilter'
import { initializeNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeNotes())
    //noteService.getAll().then((notes) => dispatch(setNotes(notes)))
  }, [])
  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App
