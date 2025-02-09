const NoteForm = ({ addNote, handleNoteChange }) => (
  <form onSubmit={addNote}>
    <input onChange={handleNoteChange} />
    <button type="submit">save</button>
  </form>
)
export default NoteForm
