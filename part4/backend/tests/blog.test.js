const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const listHelper = require('../utils/list_helper')
const app = require('../app')
const Blog = require('../models/blogPostModel')
const supertest = require('supertest')

const api = supertest(app)

const initialBlogs = listHelper.listWithThreeeBlogs

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

test('there are *initialBlogs* number of entries', async () => {
  const response = await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('The blogs have ID property', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body[0].hasOwnProperty('id'), true)
})

test('The POST creates and saves a blog in the DB', async () => {
  await api
    .post('/api/blogs')
    .send(listHelper.newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map((res) => res.title)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  assert(contents.includes('Go To Statement Considered Harmful'))
})
test('No likes defaults to 0', async () => {
  const createdBlog = await api
    .post('/api/blogs')
    .send(listHelper.newBlogNoLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get(`/api/blogs/${createdBlog.body.id}`)
  assert(response.body.likes === 0)
})

test.only('Title or URL missing is a bad request', async () => {
  await api.post('/api/blogs').send(listHelper.newBlogNoTitle).expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    assert.strictEqual(result, 5)
  })
  test('when list has multiple blogs, add up the total likes', () => {
    const result = listHelper.totalLikes(initialBlogs)
    assert.strictEqual(result, 39)
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

after(async () => {
  await mongoose.connection.close()
})
