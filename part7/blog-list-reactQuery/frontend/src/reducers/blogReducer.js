import { createSlice, current } from '@reduxjs/toolkit'
import blogService from '../services/blogService'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    getBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateLikeBlog(state, action) {
      const blogToUpdate = state.find((blog) => blog.id === action.payload.id)
      if (blogToUpdate) {
        blogToUpdate.likes = action.payload.likes
      }
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
  },
})

export const { getBlogs, appendBlog, updateLikeBlog, removeBlog } =
  blogSlice.actions
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(getBlogs(blogs))
  }
}
export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog.data))
  }
}
export const likeBlog = (likedBlog) => {
  return async (dispatch) => {
    await blogService.update(likedBlog)
    dispatch(updateLikeBlog(likedBlog))
  }
}
export const deleteBlog = (blogToDelete) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blogToDelete.id)
    dispatch(removeBlog(blogToDelete))
  }
}
export default blogSlice.reducer
