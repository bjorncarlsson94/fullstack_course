const Anecdote = ({ anecdote }) => {
  const styling = {
    paddingTop: 10,
  }
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <div style={styling}>has {anecdote.votes} votes</div>
      <div style={styling}>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </div>
    </div>
  )
}
export default Anecdote
