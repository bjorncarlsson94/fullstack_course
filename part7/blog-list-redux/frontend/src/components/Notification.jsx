import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {
  let setSeverity = 'success'
  const notification = useSelector(({ notification }) => {
    if (!!notification) {
      return notification
    }
    return null
  })
  if (
    notification &&
    (String(notification).toLowerCase().includes('failed') ||
      String(notification).toLowerCase().includes('wrong') ||
      String(notification).toLowerCase().includes('deleted'))
  ) {
    setSeverity = 'error'
  }
  return notification ? (
    <Alert
      variant="standard"
      className="error"
      severity={setSeverity}
      sx={{ position: 'absolute', left: '75%' }}
    >
      {notification}
    </Alert>
  ) : null
}
export default Notification
