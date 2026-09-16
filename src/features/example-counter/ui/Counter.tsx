import { Button } from '@/shared/ui'
import counterMarkUrl from '../assets/counter-mark.svg'
import { useCounter } from '../hooks/useCounter'

export const Counter: React.FC<{ initial?: number }> = ({ initial }) => {
  const { count, decrement, increment, reset } = useCounter(initial)

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white sm:p-8">
      <img src={counterMarkUrl} alt="" width="48" height="48" />
      <h2 className="mt-4 text-2xl font-semibold" data-testid="title">
        计数器
      </h2>
      <p
        className="mt-4 text-xl text-slate-200 tabular-nums"
        data-testid="count"
      >
        当前值：{count}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="button" aria-label="减一" onClick={decrement}>
          -
        </Button>
        <Button type="button" aria-label="加一" onClick={increment}>
          +
        </Button>
        <Button type="button" aria-label="重置计数" onClick={reset}>
          重置
        </Button>
      </div>
    </div>
  )
}
