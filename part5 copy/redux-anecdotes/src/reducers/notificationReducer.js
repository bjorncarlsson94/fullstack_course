import { createSlice, current } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    displayNotification(state, action) {
      return (state = action.payload)
    },
    removeNotification(state) {
      return (state = null)
    },
  },
})

export const { displayNotification, removeNotification } =
  notificationSlice.actions
export const setNotification = (content, seconds) => {
  return async (dispatch) => {
    dispatch(displayNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
  }
}
export default notificationSlice.reducer
