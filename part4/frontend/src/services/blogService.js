import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}
const getOne = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/${blogId}`, config)
  return response.data
}
const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response
}
const update = async (blogChange) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(
    `${baseUrl}/${blogChange.id}`,
    blogChange,
    config
  )
  return response.data
}
const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

export default { getAll, setToken, create, update, getOne, deleteBlog }
