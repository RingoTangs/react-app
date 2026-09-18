import type { ComponentPropsWithoutRef } from 'react'
import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

const spinner = tv({
  slots: {
    root: 'inline-flex items-center justify-center',
    icon: 'shrink-0 animate-spin',
    track: 'stroke-current opacity-15',
    indicator: 'stroke-current',
    label: 'text-muted-foreground text-sm',
  },

  variants: {
    size: {
      xs: {
        icon: 'size-3.5',
      },
      sm: {
        icon: 'size-4',
      },
      md: {
        icon: 'size-5',
      },
      lg: {
        icon: 'size-7',
      },
      xl: {
        icon: 'size-10',
      },
    },

    color: {
      primary: {
        root: 'text-primary',
      },
      foreground: {
        root: 'text-foreground',
      },
      muted: {
        root: 'text-muted-foreground',
      },
      current: {
        root: 'text-current',
      },
    },

    orientation: {
      horizontal: {
        root: 'flex-row gap-2.5',
      },
      vertical: {
        root: 'flex-col gap-3',
      },
    },
  },

  defaultVariants: {
    size: 'md',
    color: 'primary',
    orientation: 'vertical',
  },
})

type SpinnerVariants = VariantProps<typeof spinner>

interface SpinProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'color'>, SpinnerVariants {
  label?: string
  fullscreen?: boolean
}

export function Spin({
  size,
  color,
  orientation,
  label,
  fullscreen = false,
  className,
  ...props
}: SpinProps) {
  const styles = spinner({
    size,
    color,
    orientation,
  })

  const content = (
    <div
      {...props}
      role="status"
      aria-label={label ?? 'Loading'}
      className={styles.root({ className })}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={styles.icon()}
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          strokeWidth="2.25"
          className={styles.track()}
        />

        <path
          d="M12 3a9 9 0 0 1 9 9"
          strokeWidth="2.25"
          strokeLinecap="round"
          className={styles.indicator()}
        />
      </svg>

      {label && <span className={styles.label()}>{label}</span>}
    </div>
  )

  if (!fullscreen) {
    return content
  }

  return (
    <div className="flex min-h-dvh w-full items-center justify-center">
      {content}
    </div>
  )
}
