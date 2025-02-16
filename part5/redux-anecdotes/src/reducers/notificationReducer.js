import { createSlice, current } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    alertNotification(state, action) {
      return (state = action.payload)
    },
    removeNotification(state, action) {
      return (state = action.payload)
    },
  },
})

export const { alertNotification, removeNotification } =
  notificationSlice.actions
export default notificationSlice.reducer
