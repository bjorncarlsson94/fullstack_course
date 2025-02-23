import { configureStore } from '@reduxjs/toolkit'

import notificationSlice from '../reducers/notificationReducer'
import blogSlice from '../reducers/blogReducer'
import userSlice from '../reducers/loginReducer'

const store = configureStore({
  reducer: {
    blogs: blogSlice,
    notification: notificationSlice,
    user: userSlice,
  },
})

export default store
