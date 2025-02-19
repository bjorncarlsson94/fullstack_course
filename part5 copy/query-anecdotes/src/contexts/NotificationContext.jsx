import { createContext, useReducer } from 'react'

const notificiationReducer = (state, action) => {
  switch (action.type) {
    case 'addNotification': {
      return (state = action.payload)
    }
    case 'removeNotification': {
      state = null
    }
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificiationReducer,
    null
  )
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
