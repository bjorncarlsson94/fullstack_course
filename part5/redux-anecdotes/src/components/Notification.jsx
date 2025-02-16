import { useSelector, useDispatch } from 'react-redux'

const Notification = () => {
  const dispatch = useDispatch()

  const notification = useSelector(({ notification }) => {
    if (!!notification) {
      return notification
    }
    return null
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return notification ? <div style={style}>{notification}</div> : null
  //return !notification && <div style={style}>{notification}</div>
}

export default Notification
