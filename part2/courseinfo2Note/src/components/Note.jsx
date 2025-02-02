const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important ? "make not important" : "make important";
  return (
    <li className="note">
      {note.content}
      <button style={{ marginLeft: "15px" }} onClick={toggleImportance}>
        {label}
      </button>
      <button style={{ marginLeft: "15px" }} onClick={deleteNote}>
        Delete
      </button>
    </li>
  );
};

export default Note;
