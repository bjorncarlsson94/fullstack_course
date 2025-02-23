import axios from 'axios'
import mongoose from 'mongoose'
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
  console.log('Request config: ', config)

  const response = await axios.post(baseUrl, newBlog, config)
  return response
}
const update = async (blogChange) => {
  const config = {
    headers: { Authorization: token },
  }
  const id = blogChange.id
  const response = await axios.put(`${baseUrl}/${id}`, blogChange, config)
  return response.data
}
const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  console.log(response)
  return response.data
}

export default { getAll, setToken, create, update, getOne, deleteBlog }
