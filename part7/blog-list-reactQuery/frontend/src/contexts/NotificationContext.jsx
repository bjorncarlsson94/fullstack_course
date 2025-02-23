import { useEffect, createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'addNotification': {
      return action.payload
    }
    case 'removeNotification': {
      return null
    }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  )

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        notificationDispatch({ type: 'removeNotification' })
      }, 5000) // Adjust the time as needed
      return () => clearTimeout(timer) // Cleanup on unmount
    }
  }, [notification])

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
