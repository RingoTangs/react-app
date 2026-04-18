import { useState } from 'react'

export const Counter: React.FC<{ initial?: number }> = ({ initial = 0 }) => {
  const [count, setCount] = useState(initial)

  return (
    <div>
      <h1 data-testid="title">计数器</h1>
      <p data-testid="count">当前值：{count}</p>
      <button type="button" onClick={() => setCount((c) => c - 1)}>
        -
      </button>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        +
      </button>
      <button type="button" onClick={() => setCount(initial)}>
        重置
      </button>
    </div>
  )
}
