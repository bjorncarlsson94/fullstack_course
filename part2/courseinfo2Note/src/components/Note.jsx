const Note = ({
  note,
  toggleImportance,
  setErrorMessage,
  setNotes,
  notes,
  noteService,
}) => {
  const label = note.important ? "make not important" : "make important";
  const deleteNoteOnClick = () => {
    console.log("Notes: ", notes);
    if (window.confirm(`Do you really want to delete ${note.content}?`)) {
      noteService
        .deleteNote(note.id)
        .then(setNotes(notes.filter((newNotes) => newNotes.id !== note.id)))
        .then(() => {
          setErrorMessage("Deleted Note " + note.content);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
        .catch(() => {
          setErrorMessage("Deletion of " + note.content + " failed");
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };
  return (
    <li className="note">
      {note.content}
      <button style={{ marginLeft: "15px" }} onClick={toggleImportance}>
        {label}
      </button>
      <button style={{ marginLeft: "15px" }} onClick={deleteNoteOnClick}>
        Delete
      </button>
    </li>
  );
};

export default Note;
