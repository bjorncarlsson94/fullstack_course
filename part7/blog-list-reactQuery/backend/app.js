const express = require('express')
require('express-async-errors')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const blogPost = require('./models/blogPostModel.js')
const config = require('./utils/config.js')
const middleware = require('./utils/middleware.js')
const logger = require('./utils/logger.js')
const blogRouter = require('./controllers/blogPosts.js')
const userRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login.js')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB: ', error.message)
  })

app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing.js')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
