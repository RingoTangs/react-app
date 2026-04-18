import type { CounterValue } from '../model/types'
import { useCounter } from '../hooks/useCounter'

export const Counter: React.FC<{ initial?: CounterValue }> = ({ initial }) => {
  const { count, decrement, increment, reset } = useCounter(initial)

  return (
    <div>
      <h1 data-testid="title">计数器</h1>
      <p data-testid="count">当前值：{count}</p>
      <button type="button" onClick={decrement}>
        -
      </button>
      <button type="button" onClick={increment}>
        +
      </button>
      <button type="button" onClick={reset}>
        重置
      </button>
    </div>
  )
}
