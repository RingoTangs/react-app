import type { CounterValue } from '../model/types'

export const getNextCount = (
  current: CounterValue,
  step: CounterValue,
): CounterValue => {
  return current + step
}
