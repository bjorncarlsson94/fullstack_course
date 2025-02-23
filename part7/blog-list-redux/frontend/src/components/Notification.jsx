import { useSelector } from 'react-redux'

const Notification = () => {
  let messageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  const notification = useSelector(({ notification }) => {
    if (!!notification) {
      return notification
    }
    return null
  })
  console.log(notification)
  if (
    notification &&
    (String(notification).toLowerCase().includes('failed') ||
      String(notification).toLowerCase().includes('wrong') ||
      String(notification).toLowerCase().includes('deleted'))
  ) {
    messageStyle.color = 'red'
  }
  return notification ? (
    <div style={messageStyle} className="error">
      {notification}
    </div>
  ) : null
}
export default Notification
