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
    updateComment(state, action) {
      const updatedBlogs = state.map((blog) =>
        blog.id === action.payload.id
          ? { ...blog, comments: action.payload.comments }
          : blog
      )
      return updatedBlogs
    },
  },
})

export const {
  getBlogs,
  appendBlog,
  updateLikeBlog,
  removeBlog,
  updateComment,
} = blogSlice.actions
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
export const addComment = (blog, comment) => {
  return async (dispatch) => {
    const response = await blogService.addComment(blog, comment)
    dispatch(updateComment(response))
  }
}
export default blogSlice.reducer
