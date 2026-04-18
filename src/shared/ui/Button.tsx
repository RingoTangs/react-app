import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

export const buttonVariants = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-lg px-6 py-3 text-base font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none',
  variants: {
    intent: {
      primary:
        'bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg focus:ring-blue-500',
      secondary:
        'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:ring-gray-500',
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
