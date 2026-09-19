import { Button } from '@/components'
import counterMarkUrl from '../assets/counter-mark.svg'
import { useCounterStore } from '../model/counterStore'

const buttonClassName = 'px-4 py-2 font-semibold'

const CounterValue: React.FC = () => {
  const count = useCounterStore((state) => state.count)

  return (
    <p
      className="text-foreground mt-4 text-xl tabular-nums"
      data-testid="count"
    >
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
    <section className="border-border bg-surface rounded-3xl border p-6 backdrop-blur-sm sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="max-w-2xl min-w-0">
          <p className="text-primary text-sm font-medium tracking-[0.16em] uppercase">
            Zustand
          </p>
          <h2
            className="text-foreground mt-3 text-3xl font-semibold"
            data-testid="title"
          >
            Counter
          </h2>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
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
