import { configureStore } from '@reduxjs/toolkit'

import notificationSlice from '../reducers/notificationReducer'
import blogSlice from '../reducers/blogReducer'
import userSlice from '../reducers/loginReducer'
import usersSlice from '../reducers/usersReducer'

const store = configureStore({
  reducer: {
    blogs: blogSlice,
    notification: notificationSlice,
    user: userSlice,
    users: usersSlice,
  },
})

export default store
