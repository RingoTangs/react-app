import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { Counter } from './Counter'

afterEach(cleanup)

describe('counter 组件', () => {
  it('默认从 0 开始', () => {
    render(<Counter />)
    expect(screen.getByTestId('count')).toHaveTextContent('当前值：0')
  })

  it('可以传入初始值', () => {
    render(<Counter initial={100} />)
    expect(screen.getByTestId('count')).toHaveTextContent('当前值：100')
  })

  it('点击 + 按钮计数加 1', () => {
    render(<Counter initial={5} />)
    const incrementBtn = screen.getByText('+')
    fireEvent.click(incrementBtn)
    expect(screen.getByTestId('count')).toHaveTextContent('当前值：6')
  })

  it('点击 - 按钮计数减 1', () => {
    render(<Counter initial={10} />)
    fireEvent.click(screen.getByText('-'))
    expect(screen.getByTestId('count')).toHaveTextContent('当前值：9')
  })

  it('点击重置按钮恢复初始值', () => {
    render(<Counter initial={99} />)
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('重置'))
    expect(screen.getByTestId('count')).toHaveTextContent('当前值：99')
  })

  it('标题正确渲染并可以使用 jest-dom 扩展断言', () => {
    render(<Counter />)
    const title = screen.getByRole('heading', { name: '计数器', level: 2 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('计数器')
    expect(screen.getByRole('button', { name: '减一' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '加一' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '重置计数' })).toBeInTheDocument()
  })

  it('支持 Tab 切换焦点和键盘操作', async () => {
    const user = userEvent.setup()
    render(<Counter />)
    await user.tab()
    expect(screen.getByRole('button', { name: '减一' })).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(screen.getByTestId('count')).toHaveTextContent('当前值：-1')
    await user.tab()
    expect(screen.getByRole('button', { name: '加一' })).toHaveFocus()
    await user.keyboard(' ')
    expect(screen.getByTestId('count')).toHaveTextContent('当前值：0')
    await user.keyboard('{Enter}')
    await user.tab()
    expect(screen.getByRole('button', { name: '重置计数' })).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(screen.getByTestId('count')).toHaveTextContent('当前值：0')
  })
})
