const blogRouter = require('express').Router()
const Blog = require('../models/blogPostModel')
const User = require('../models/user')
const CommentPost = require('../models/commentsModel')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })
  response.json(blogs)
})
blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })
  response.json(blog)
})

blogRouter.post('/', async (request, response) => {
  const user = request.user
  const blog = new Blog({ ...request.body, user: user.id })

  console.log('Blog in blogPosts', request.body)
  console.log('New blog in blogPosts', blog)

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
blogRouter.patch('/:id', async (request, response) => {
  await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: request.body.likes },
    { new: true }
  ) // {likes: request.body.likes}
  response.json(request.body)
})
blogRouter.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  const comment = new CommentPost({
    content: request.body.comment,
    blog: blog.id,
  })

  const savedComment = await comment.save()

  blog.comments.push(savedComment._id)
  await blog.save()

  const updatedBlog = await Blog.findById(blog.id).populate('comments', {
    content: 1,
  })

  response.json(updatedBlog)
})

module.exports = blogRouter
