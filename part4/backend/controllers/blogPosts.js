const blogRouter = require('express').Router()
const Blog = require('../models/blogPostModel')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogRouter.post('/', async (request, response) => {
  const user = request.user
  const blog = new Blog({ ...request.body, user: user.id })

  const savedBlog = await blog.save()
  const foundUser = await User.findById(user.id)
  foundUser.blogs = foundUser.blogs.concat(savedBlog.id)
  await foundUser.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const blogToBeDeleted = await Blog.findById(request.params.id)

  if (blogToBeDeleted.user.toString() === user.id.toString()) {
    await Blog.deleteOne({ _id: blogToBeDeleted.id })
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'invalid user' })
  }
})

blogRouter.put('/:id', async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.json(request.body)
})

module.exports = blogRouter
