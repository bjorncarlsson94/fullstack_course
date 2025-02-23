const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('../utils/list_helper')
const app = require('../app')
const User = require('../models/user')
const supertest = require('supertest')

const api = supertest(app)

beforeEach(async () => {
  //await User.deleteMany({})
  //const userObjects = initialUsers.map((user) => new User(user))
  //const promiseArray = userObjects.map((user) => user.save())
  //await Promise.all(promiseArray)
})

test('Password is too short', async () => {
  const newUser = {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 's',
  }
  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('User is invalid (no username)', async () => {
  const newUser = {
    name: 'Matti Luukkainen',
    password: 'sssssss',
  }
  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  assert(result.body.error.includes('is required'))
})
test('An invalid user is not created', async () => {
  const newUser = {
    name: 'Matti Luukkainen',
    password: 'sssssss',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  assert(result.body.error.includes('is required'))
  const users = helper.usersInDb
  assert(users.length === 0)
})

after(async () => {
  await mongoose.connection.close()
})
