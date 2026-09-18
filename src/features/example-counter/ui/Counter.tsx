import { Button } from '@/components'
import counterMarkUrl from '../assets/counter-mark.svg'
import { useCounterStore } from '../model/counterStore'

const buttonClassName =
  'rounded-lg bg-amber-400 px-4 py-2 font-semibold text-stone-950 shadow-none hover:bg-amber-300 hover:shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300'

const CounterValue: React.FC = () => {
  const count = useCounterStore((state) => state.count)

  return (
    <p className="mt-4 text-xl text-slate-200 tabular-nums" data-testid="count">
      Current count: {count}
    </p>
  )
}

const CounterActions: React.FC = () => {
  const decrement = useCounterStore((state) => state.decrement)
  const increment = useCounterStore((state) => state.increment)
  const reset = useCounterStore((state) => state.reset)

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Button
        type="button"
        className={buttonClassName}
        aria-label="Decrease count"
        onClick={decrement}
      >
        -
      </Button>
      <Button
        type="button"
        className={buttonClassName}
        aria-label="Increase count"
        onClick={increment}
      >
        +
      </Button>
      <Button
        type="button"
        className={buttonClassName}
        aria-label="Reset count"
        onClick={reset}
      >
        Reset
      </Button>
    </div>
  )
}

export const Counter: React.FC = () => {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="max-w-2xl min-w-0">
          <p className="text-sm font-medium tracking-[0.16em] text-amber-300 uppercase">
            Zustand
          </p>
          <h2
            className="mt-3 text-3xl font-semibold text-white"
            data-testid="title"
          >
            Counter
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Separate display and control components share one feature-owned
            Zustand store without passing state or actions through props.
          </p>
        </div>
        <img
          className="shrink-0"
          src={counterMarkUrl}
          alt=""
          width="48"
          height="48"
        />
      </div>
      <CounterValue />
      <CounterActions />
    </section>
  )
}
