import { useState } from 'react'
const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true,
    })

    setNewNote('')
  }
  return (
    <div className="formDiv">
      <form onSubmit={addNote}>
        <input
          data-testid="noteForm"
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
          placeholder="write note content here"
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}
export default NoteForm
