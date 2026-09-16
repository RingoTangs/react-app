import { Button } from '@/shared/ui'
import counterMarkUrl from '../assets/counter-mark.svg'
import { useCounter } from '../hooks/useCounter'

const buttonClassName =
  'rounded-lg bg-amber-400 px-4 py-2 font-semibold text-stone-950 shadow-none hover:bg-amber-300 hover:shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300'

export const Counter: React.FC<{ initial?: number }> = ({ initial }) => {
  const { count, decrement, increment, reset } = useCounter(initial)

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="max-w-2xl min-w-0">
          <p className="text-sm font-medium tracking-[0.16em] text-amber-300 uppercase">
            Local State
          </p>
          <h2
            className="mt-3 text-3xl font-semibold text-white"
            data-testid="title"
          >
            Counter
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            This example keeps local state and update logic inside a
            feature-owned hook.
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
      <p
        className="mt-4 text-xl text-slate-200 tabular-nums"
        data-testid="count"
      >
        Current count: {count}
      </p>
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
    </section>
  )
}
