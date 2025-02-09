import { useState } from 'react'
import blogService from '../services/blogService'

const BlogForm = ({ setBlogs, blogs, setMessage, blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.create({
        title: title,
        author: author,
        url: url,
      })
      setBlogs([...blogs, response.data])
      blogFormRef.current.toggleVisibility()
      setTitle('')
      setAuthor('')
      setURL('')
      setMessage(
        `Blog: ${response.data.title} By: ${response.data.author} was added`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Failed to create a new blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  return (
    <div>
      <h2>Create new blog entry</h2>
      <form onSubmit={handleBlogCreation}>
        <div style={{ margin: '5px' }}>
          Title{' '}
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div style={{ margin: '5px' }}>
          Author{' '}
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div style={{ margin: '5px' }}>
          URL{' '}
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setURL(target.value)}
          ></input>
        </div>
        <button style={{ margin: '5px' }} type="submit">
          Post new blog
        </button>
      </form>
    </div>
  )
}

export default BlogForm
