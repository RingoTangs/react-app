import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { NotFound } from './NotFound'

afterEach(cleanup)

describe('404 展示组件', () => {
  it('不依赖路由环境即可展示 404 页面', () => {
    render(<NotFound onBackHome={vi.fn()} />)

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Page Not Found' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Back to Home' }),
    ).toBeInTheDocument()
  })

  it('点击返回首页按钮时调用一次外部回调', async () => {
    const onBackHome = vi.fn()
    const user = userEvent.setup()
    render(<NotFound onBackHome={onBackHome} />)

    expect(onBackHome).not.toHaveBeenCalled()
    await user.click(screen.getByRole('button', { name: 'Back to Home' }))
    expect(onBackHome).toHaveBeenCalledTimes(1)
  })
})
