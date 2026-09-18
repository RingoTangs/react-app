import type { ComponentPropsWithoutRef } from 'react'
import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

const spin = tv({
  slots: {
    base: ['inline-flex items-center justify-center', 'gap-3'],
    indicator: ['relative shrink-0'],
    track: ['absolute inset-0 rounded-full', 'border-current opacity-15'],
    ring: [
      'absolute inset-0 rounded-full',
      'border-transparent border-t-current border-r-current',
      'animate-spin',
      'motion-reduce:animate-[spin_1.8s_linear_infinite]',
    ],
    core: [
      'absolute rounded-full bg-current',
      'opacity-70',
      'animate-pulse',
      'motion-reduce:animate-none',
    ],
    label: ['text-sm font-medium', 'text-zinc-500 dark:text-zinc-400'],
  },

  variants: {
    size: {
      xs: {
        indicator: 'size-4',
        track: 'border-[1.5px]',
        ring: 'border-[1.5px]',
        core: 'inset-[6px]',
        label: 'text-xs',
      },

      sm: {
        indicator: 'size-5',
        track: 'border-2',
        ring: 'border-2',
        core: 'inset-[7px]',
        label: 'text-xs',
      },

      md: {
        indicator: 'size-7',
        track: 'border-2',
        ring: 'border-2',
        core: 'inset-[10px]',
      },

      lg: {
        indicator: 'size-9',
        track: 'border-[3px]',
        ring: 'border-[3px]',
        core: 'inset-[13px]',
      },

      xl: {
        indicator: 'size-12',
        track: 'border-[3px]',
        ring: 'border-[3px]',
        core: 'inset-[18px]',
        label: 'text-base',
      },
    },

    tone: {
      primary: {
        indicator: 'text-primary',
      },

      neutral: {
        indicator: 'text-zinc-700 dark:text-zinc-300',
      },

      current: {
        indicator: 'text-current',
      },
    },

    direction: {
      vertical: {
        base: 'flex-col gap-3',
      },

      horizontal: {
        base: 'flex-row gap-3',
      },
    },
  },

  defaultVariants: {
    size: 'md',
    tone: 'primary',
    direction: 'vertical',
  },
})

type SpinVariants = VariantProps<typeof spin>

interface SpinProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'>, SpinVariants {
  label?: string
  fullscreen?: boolean
}

export function Spin({
  size,
  tone,
  direction,
  label,
  fullscreen = false,
  className,
  ...props
}: SpinProps) {
  const styles = spin({
    size,
    tone,
    direction,
  })

  const content = (
    <div
      {...props}
      role="status"
      aria-label={label ?? 'Loading'}
      className={styles.base({ className })}
    >
      <div className={styles.indicator()} aria-hidden="true">
        <span className={styles.track()} />
        <span className={styles.ring()} />
        <span className={styles.core()} />
      </div>

      {label && <span className={styles.label()}>{label}</span>}
    </div>
  )

  if (!fullscreen) {
    return content
  }

  return (
    <div className="bg-background flex min-h-dvh w-full items-center justify-center">
      {content}
    </div>
  )
}
