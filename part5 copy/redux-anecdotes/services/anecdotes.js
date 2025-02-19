import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}
const addVote = async (id) => {
  const currentAnecdote = await axios.get(`${baseUrl}/${id}`)
  const updatedVotes = currentAnecdote.data.votes + 1 // Increment the votes
  const response = await axios.patch(`${baseUrl}/${id}`, {
    votes: updatedVotes,
  })
  return response.data
}

export default { getAll, createNew, addVote }
