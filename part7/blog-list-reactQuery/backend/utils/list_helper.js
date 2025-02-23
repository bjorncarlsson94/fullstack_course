var _ = require('lodash')
const User = require('../../../Part3/notesBackEnd_fullstack/models/user')

const listWithThreeeBlogs = [
  {
    title: 'WHO?',
    author: 'Does not matter',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 2,
    __v: 0,
  },
  {
    title: 'Go To Uppsala',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 15,
    __v: 0,
  },
  {
    title: 'Away',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 4,
    __v: 0,
  },
  {
    title: 'Nowhere',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 2,
    __v: 0,
  },
  {
    title: 'WHY?',
    author: 'No one',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 2,
    __v: 0,
  },
  {
    title: 'WHEN?',
    author: 'No one',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 38,
    __v: 0,
  },
]
const newBlog = {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
  likes: 0,
  __v: 0,
}
const newBlogNoLikes = {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
  __v: 0,
}
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0,
  },
]
const newBlogNoTitle = {
  author: 'Edsger W. Dijkstra',
  url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
  __v: 0,
}

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}
const favouriteBlog = (blogs) => {
  return blogs.reduce((acc, cur) => {
    return acc.likes > cur.likes ? acc : cur
  })
}
const mostBlogs = (blogs) => {
  let countedBlogs = _.countBy(blogs, 'author')

  let maxValue = _.max(Object.values(countedBlogs))
  let maxKey = _.findKey(countedBlogs, (count) => count === maxValue)

  return {
    author: maxKey,
    blogs: maxValue,
  }
}
const mostLikes = (blogs) => {
  let groupedBlogs = _.groupBy(blogs, 'author')

  let groupedBlogsAndCount = _.mapValues(groupedBlogs, (authorBlogs) => {
    return _.sumBy(authorBlogs, 'likes')
  })

  let maxValue = _.max(Object.values(groupedBlogsAndCount))
  let maxKey = _.findKey(groupedBlogsAndCount, (count) => count === maxValue)

  return {
    author: maxKey,
    likes: maxValue,
  }
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
  listWithThreeeBlogs,
  newBlog,
  newBlogNoLikes,
  listWithOneBlog,
  newBlogNoTitle,
  usersInDb,
}
