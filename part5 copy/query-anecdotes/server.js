import jsonServer from 'json-server'
import { useContext } from 'react'
import NotificationContext from './src/contexts/NotificationContext'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const validator = (request, response, next) => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  console.log()

  const handleNotification = () => {
    notificationDispatch({
      type: 'addNotification',
      payload: 'The new anecdote is too short',
    })
    setTimeout(() => {
      notificationDispatch({ type: 'removeNotification' })
    }, 5000)
  }

  const { content } = request.body

  if (request.method === 'POST' && (!content || content.length < 5)) {
    handleNotification()
    return response.status(400).json({
      error: 'too short anecdote, must have length 5 or more',
    })
  } else {
    next()
  }
}

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(validator)
server.use(router)

server.listen(3001, () => {
  console.log('JSON Server is running')
})
