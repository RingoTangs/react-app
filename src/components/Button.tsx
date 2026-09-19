import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'focus-visible:ring-ring focus-visible:ring-offset-background inline-flex cursor-pointer items-center justify-center rounded-lg px-6 py-3 text-base font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    intent: {
      primary:
        'bg-primary text-primary-foreground enabled:hover:bg-primary-hover shadow-md enabled:hover:shadow-lg',
      secondary:
        'border-border bg-surface text-foreground enabled:hover:bg-surface-hover border',
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
})

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export const Button: React.FC<ButtonProps> = ({
  intent,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={buttonVariants({ intent, className })}
      {...props}
    />
  )
}
