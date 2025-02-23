import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './newBlog'
import { createRef } from 'react'

test.only('Testing the blogForm', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  const { form } = render(
    <BlogForm
      setBlogs={vi.fn()}
      blogs={[]}
      setMessage={vi.fn()}
      blogFormRef={{ current: { toggleVisibility: vi.fn() } }}
      createBlogEntry={createBlog}
    />
  )
  const inputTitle = screen.getByPlaceholderText('title')
  const inputAuthor = screen.getByPlaceholderText('author')
  const inputUrl = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('Post new blog')

  await user.type(inputTitle, 'adding a title')
  await user.type(inputAuthor, 'adding a author')
  await user.type(inputUrl, 'adding a url')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].title).toBe('adding a title')
})
