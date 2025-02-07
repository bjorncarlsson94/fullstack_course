const bcrypt = require('bcrypt')
const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const listHelper = require('../utils/list_helper')
const app = require('../app')
const Blog = require('../models/blogPostModel')
const supertest = require('supertest')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const api = supertest(app)

const initialBlogs = listHelper.listWithThreeeBlogs

describe('Test that do NOT require a user', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs.map((blog) => new Blog(blog))
    const promiseArray = blogObjects.map((blog) => blog.save())
    await Promise.all(promiseArray)
  })
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })

  // test('there are *initialBlogs* number of entries', async () => {
  //   //invalidated as the beforeEach no longer can remove all blog entries due to user authenitication
  //   const response = await api
  //     .get('/api/blogs')
  //     .expect('Content-Type', /application\/json/)
  //   assert.strictEqual(response.body.length, initialBlogs.length)
  // })

  test('The blogs have ID property', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body[0].hasOwnProperty('id'), true)
  })

  test('I can update a blog entry', async () => {
    const beforeUpdateResponse = await api.get('/api/blogs')

    await api
      .put(`/api/blogs/${beforeUpdateResponse.body[0].id}`)
      .send({ likes: beforeUpdateResponse.body[0].likes + 1 })

    const response = await api.get('/api/blogs')
    const content = response.body.map((blog) => blog.title)
    assert(!content.includes(initialBlogs[0].likes))
  })

  describe('total likes', () => {
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listHelper.listWithOneBlog)
      assert.strictEqual(result, 5)
    })
    test('when list has multiple blogs, add up the total likes', () => {
      const result = listHelper.totalLikes(initialBlogs)
      assert.strictEqual(result, 63)
    })
  })

  describe('Favourite blog', () => {
    test('When there is a favourite blog', () => {
      const result = listHelper.favouriteBlog(initialBlogs)
      assert.deepStrictEqual(result, initialBlogs[1])
    })
    test('When an author has contributed more', () => {
      const result = listHelper.mostBlogs(initialBlogs)
      const maxResult = {
        author: 'Edsger W. Dijkstra',
        blogs: 3,
      }
      assert.deepStrictEqual(result, maxResult)
    })
    test('When an author has the most likes', () => {
      const result = listHelper.mostLikes(initialBlogs)
      const mostResult = {
        author: 'No one',
        likes: 40,
      }
      assert.deepStrictEqual(result, mostResult)
    })
  })
  test('I can delete a blog from the DB', async () => {
    const beforeDeleteResponse = await api.get('/api/blogs')
    await api
      .delete(`/api/blogs/${beforeDeleteResponse.body[0].id}`)
      .set({ Authorization: `Bearer ${token}` })
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length - 1)
  })
})

describe('tests that require users', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'firstuser2', passwordHash })
    await user.save()
  })

  test.only('The POST creates and saves a blog in the DB', async () => {
    const blogsBeforePost = await Blog.find({})

    const user = await User.findOne({ username: 'firstuser2' })
    const userForToken = { username: user.username, id: user._id }
    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    })
    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send(listHelper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs') //.set({
    //Authorization: `Bearer ${token}`,
    //})
    const contents = response.body.map((res) => res.title)

    assert.strictEqual(response.body.length, blogsBeforePost.length + 1)
    assert(contents.includes('Go To Statement Considered Harmful'))
  })
  test('No likes defaults to 0', async () => {
    const user = await User.findOne({ username: 'firstuser' })
    const userForToken = { username: user.username, id: user._id }
    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    })
    const createdBlog = await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send(listHelper.newBlogNoLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get(`/api/blogs/${createdBlog.body.id}`).set({
      Authorization: `Bearer ${token}`,
    })
    assert(response.body.likes === 0)
  })
  test('Title or URL missing is a bad request', async () => {
    const blogsBeforePost = await Blog.find({})

    const user = await User.findOne({ username: 'firstuser' })
    const userForToken = { username: user.username, id: user._id }
    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    })
    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send(listHelper.newBlogNoTitle)
      .expect(400)

    const response = await api.get('/api/blogs').set({
      Authorization: `Bearer ${token}`,
    })

    assert.strictEqual(response.body.length, blogsBeforePost.length)
  })
  test.only('No authorization', async () => {
    await api.post('/api/blogs').send(listHelper.newBlogNoTitle).expect(401)
  })
})

after(async () => {
  await mongoose.connection.close()
})
