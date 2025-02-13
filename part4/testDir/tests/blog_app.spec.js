const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'bjorn',
        password: 'mypassword',
        name: 'my name',
      },
    })
    await request.post('/api/users', {
      data: {
        username: 'bjorn2',
        password: 'mypassword',
        name: 'my name',
      },
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Username')).toBeVisible()
    await expect(page.getByText('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'bjorn', 'mypassword')

      await expect(page.getByText('logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'bjorn', 'wrongpassword')

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('Wrong Credentials')
    })
  })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'bjorn', 'mypassword')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(
        page,
        'adding a new title',
        'adding author',
        'thisIsaUrl'
      )

      await expect(page.locator('.error')).toContainText('added')
      await expect(
        page.getByText('adding a new title adding author')
      ).toBeVisible()
      //Due to Notification being configured only getting text based on title results in 2 instances
      //adding author to search will result in 1 as notification has "By" between.
    })
    test('a blog can be liked', async ({ page }) => {
      await createBlog(
        page,
        'adding a new title',
        'adding author',
        'thisIsaUrl'
      )
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'Like' }).click()

      await expect(page.getByText('1 likes')).toBeVisible()
    })
    test('a blog can be deleted', async ({ page }) => {
      await createBlog(
        page,
        'adding a new title',
        'adding author',
        'thisIsaUrl'
      )
      page.reload()
      await page.getByRole('button', { name: 'view' }).click()
      page.once('dialog', (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`)
        dialog.accept().catch(() => {})
      })
      await page.getByRole('button', { name: 'Delete blog' }).click()
      await expect(page.locator('.blog')).not.toBeAttached()
    })
    test('I cannot delete a blog another user has created', async ({
      page,
    }) => {
      await createBlog(
        page,
        'adding a new title',
        'adding author',
        'thisIsaUrl'
      )
      await page.getByRole('button', { name: 'Logout' }).click()
      await loginWith(page, 'bjorn2', 'mypassword')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(
        page.getByRole('button', { name: 'Delete blog' })
      ).not.toBeAttached()
    })
    test('the blogs are sorted', async ({ page }) => {
      await createBlog(
        page,
        `adding a new title 1`,
        'adding author',
        'thisIsaUrl'
      )
      await createBlog(
        page,
        `adding a new title 2`,
        'adding author',
        'thisIsaUrl'
      )
      await page.getByRole('button', { name: 'view' }).first().click()
      await page.getByRole('button', { name: 'view' }).first().click()
      const likeButtons = await page.getByRole('button', { name: 'Like' }).all()
      for (let i = 0; i < 3; i++) {
        await likeButtons[0].click()
      }
      for (let i = 0; i < 12; i++) {
        await likeButtons[1].click()
      }
      await page.getByRole('button', { name: 'Sort Blogs' }).click()
      const blogs = await page.locator('.blog')
      const blogTexts = await blogs.allTextContents()

      const blogNumbers = blogTexts.map((text) => {
        const match = text.match(/(\d+) likes/)
        return parseInt(match)
      })

      const isSorted = blogNumbers[0] > blogNumbers[1]
      expect(isSorted).toBe(true)
    })
  })
})
