import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe.skip('skipper', async () => {
  test('Renders content', () => {
    const blog = {
      title: 'this is a blog title',
      author: 'Author von Bloggy',
      user: {
        username: 'I am the blog user',
      },
    }
    const user = {
      username: 'I am a user',
    }

    const { container } = render(<Blog blog={blog} user={user} />)
    //Both title and author is rendered in the same component #blog-info
    //fetching this component by querySelector

    const element = container.querySelector('#blog-info')
    expect(element).toBeDefined()
  })

  test('url and likes are shown when viewed', async () => {
    const blog = {
      title: 'this is a blog title',
      author: 'Author von Bloggy',
      user: {
        username: 'I am the blog user',
        name: 'this is user.name',
      },
      likes: 0,
      url: 'https://www.thisIsAUrl.com',
    }
    const user = {
      username: 'I am a user',
    }
    const mockHandler = vi.fn()

    render(<Blog blog={blog} user={user} mockHandler={mockHandler} />)

    const mockUser = userEvent.setup()
    const viewButton = screen.getByText('view')
    await mockUser.click(viewButton)
    //   const likeButton = screen.getByText('like')
    //   await mockUser.click(likeButton)
    //   await mockUser.click(likeButton)
    const elementLikes = screen.getByText('0 likes')
    const elementUrl = screen.getByText('https://www.thisIsAUrl.com')

    expect(elementLikes).toBeDefined()
    expect(elementUrl).toBeDefined()
    expect(mockHandler.mock.calls).toHaveLength(1)
  })

  test('I can click "like" twice', async () => {
    const blog = {
      title: 'this is a blog title',
      author: 'Author von Bloggy',
      user: {
        username: 'I am the blog user',
        name: 'this is user.name',
      },
      likes: 0,
      url: 'https://www.thisIsAUrl.com',
    }
    const user = {
      username: 'I am a user',
    }
    const mockHandler = vi.fn()

    render(<Blog blog={blog} user={user} setBlogs={mockHandler} />)

    const mockUser = userEvent.setup()
    const viewButton = screen.getByText('view')
    await mockUser.click(viewButton)

    const likeButton = screen.getByText('Like')
    await mockUser.click(likeButton)
    await mockUser.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(3) //Viewbutton + 2 likes
  })
})
