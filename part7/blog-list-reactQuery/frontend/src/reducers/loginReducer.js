import { createSlice, current } from '@reduxjs/toolkit'
import loginService from '../services/loginService'
import blogService from '../services/blogService'

const userSlice = createSlice({
  name: 'login',
  initialState: {},
  reducers: {
    loginUser(state, action) {
      const user = action.payload
      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      state.user = user
    },
    logoutUser(state, action) {
      window.localStorage.removeItem('loggedInBlogUser')
      return {}
    },
  },
})

export const { loginUser, logoutUser } = userSlice.actions
export const onLoginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })
    dispatch(loginUser(user))
  }
}

export default userSlice.reducer
