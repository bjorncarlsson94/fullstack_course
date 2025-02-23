import { useState, useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'

const BlogForm = ({ blogFormRef, createBlogEntry }) => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    createBlogEntry({
      title: title,
      author: author,
      url: url,
    })
    blogFormRef.current.toggleVisibility()
    notificationDispatch({
      type: 'addNotification',
      payload: `Blog: ${title} By: ${author} was added`,
    })
    setTitle('')
    setAuthor('')
    setURL('')
  }
  return (
    <div>
      <h2>Create new blog entry</h2>
      <form
        onSubmit={(event) => {
          handleBlogCreation(event, { title: title, author: author, url: url })
        }}
      >
        <div style={{ margin: '5px' }}>
          Title{' '}
          <input
            type="text"
            value={title}
            name="title"
            placeholder="title"
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div style={{ margin: '5px' }}>
          Author{' '}
          <input
            type="text"
            value={author}
            name="author"
            placeholder="author"
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div style={{ margin: '5px' }}>
          URL{' '}
          <input
            type="text"
            value={url}
            name="url"
            placeholder="url"
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
