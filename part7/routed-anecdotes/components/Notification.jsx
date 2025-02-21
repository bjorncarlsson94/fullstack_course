const Notification = ({ notification }) => {
  let messageStyle = {
    marginTop: 15,
    marginBottom: 15,
    padding: 15,
    borderColor: 'green',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
  }
  if (notification !== '') {
    return <div style={messageStyle}>"{notification}"</div>
  }
}
export default Notification
