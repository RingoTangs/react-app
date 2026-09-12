import { useState } from 'react'

export const useCounter = (initial: number = 0) => {
  const [count, setCount] = useState(initial)

  const decrement = () => {
    setCount((current) => current - 1)
  }

  const increment = () => {
    setCount((current) => current + 1)
  }

  const reset = () => {
    setCount(initial)
  }

  return {
    count,
    decrement,
    increment,
    reset,
  }
}
