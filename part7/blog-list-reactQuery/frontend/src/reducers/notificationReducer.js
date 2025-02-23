import { createSlice, current } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      console.log(action.payload)
      return (state = action.payload)
    },
    removeNotification(state) {
      return (state = null)
    },
  },
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const addNotification = (content, milliSeconds) => {
  return async (dispatch) => {
    dispatch(setNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, milliSeconds * 1000)
  }
}

export default notificationSlice.reducer
