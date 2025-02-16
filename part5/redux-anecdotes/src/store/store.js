import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from '../reducers/anecdoteReducer'
import filterSlice from '../reducers/filterReducer'
import notificationSlice from '../reducers/notificationReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterSlice,
    notification: notificationSlice,
  },
})

export default store
