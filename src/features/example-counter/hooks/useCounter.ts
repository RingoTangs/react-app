import type { CounterValue } from '../model/types'
import { useState } from 'react'
import { getNextCount } from '../lib/getNextCount'
import { initialCounterValue } from '../model/constants'

export const useCounter = (initial: CounterValue = initialCounterValue) => {
  const [count, setCount] = useState<CounterValue>(initial)

  const decrement = () => {
    setCount((current) => getNextCount(current, -1))
  }

  const increment = () => {
    setCount((current) => getNextCount(current, 1))
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
