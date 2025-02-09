const Notification = ({ message }) => {
  let messageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (message === null) {
    return null
  }
  if (
    message.includes('Failed') ||
    message.includes('Wrong') ||
    message.includes('Deleted')
  ) {
    messageStyle.color = 'red'
  }
  return <div style={messageStyle}>{message}</div>
}
export default Notification
