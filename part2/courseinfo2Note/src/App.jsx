import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import LogoutButton from './components/LogoutButton'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = async (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    const returnedNote = await noteService.create(noteObject)

    setNotes(notes.concat(returnedNote))
    setNewNote('')
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
        console.log('Returned note is: ', returnedNote)
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        //  setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleNoteChange = (event) => {
    //console.log(event.target.value);
    setNewNote(event.target.value)
  }
  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Important Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        <LoginForm
          setUsername={setUsername}
          username={username}
          password={password}
          setPassword={setPassword}
          setUser={setUser}
          setErrorMessage={setErrorMessage}
        />
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <NoteForm addNote={addNote} handleNoteChange={handleNoteChange} />
          <LogoutButton
            setUser={setUser}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </div>
      )}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            //deleteNote={() => deleteNote(note.id)}
            setErrorMessage={setErrorMessage}
            setNotes={setNotes}
            notes={notes}
            noteService={noteService}
          />
        ))}
      </ul>
      <Footer />
    </div>
  )
}

export default App
