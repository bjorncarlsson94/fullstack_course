import { configureStore } from '@reduxjs/toolkit'

import userSlice from '../reducers/loginReducer'

const store = configureStore({
  reducer: {
    user: userSlice,
  },
})

export default store
