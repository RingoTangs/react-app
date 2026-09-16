import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { Counter } from './Counter'

afterEach(cleanup)

describe('counter 组件', () => {
  it('默认从 0 开始', () => {
    render(<Counter />)
    expect(screen.getByTestId('count')).toHaveTextContent('Current count: 0')
  })

  it('可以传入初始值', () => {
    render(<Counter initial={100} />)
    expect(screen.getByTestId('count')).toHaveTextContent('Current count: 100')
  })

  it('点击 + 按钮计数加 1', () => {
    render(<Counter initial={5} />)
    const incrementBtn = screen.getByText('+')
    fireEvent.click(incrementBtn)
    expect(screen.getByTestId('count')).toHaveTextContent('Current count: 6')
  })

  it('点击 - 按钮计数减 1', () => {
    render(<Counter initial={10} />)
    fireEvent.click(screen.getByText('-'))
    expect(screen.getByTestId('count')).toHaveTextContent('Current count: 9')
  })

  it('点击重置按钮恢复初始值', () => {
    render(<Counter initial={99} />)
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('Reset'))
    expect(screen.getByTestId('count')).toHaveTextContent('Current count: 99')
  })

  it('标题正确渲染并可以使用 jest-dom 扩展断言', () => {
    render(<Counter />)
    const title = screen.getByRole('heading', { name: 'Counter', level: 2 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Counter')
    expect(
      screen.getByRole('button', { name: 'Decrease count' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Increase count' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Reset count' }),
    ).toBeInTheDocument()
  })

  it('支持 Tab 切换焦点和键盘操作', async () => {
    const user = userEvent.setup()
    render(<Counter />)
    await user.tab()
    expect(screen.getByRole('button', { name: 'Decrease count' })).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(screen.getByTestId('count')).toHaveTextContent('Current count: -1')
    await user.tab()
    expect(screen.getByRole('button', { name: 'Increase count' })).toHaveFocus()
    await user.keyboard(' ')
    expect(screen.getByTestId('count')).toHaveTextContent('Current count: 0')
    await user.keyboard('{Enter}')
    await user.tab()
    expect(screen.getByRole('button', { name: 'Reset count' })).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(screen.getByTestId('count')).toHaveTextContent('Current count: 0')
  })
})
