import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { mergeClass } from '~/utils/style'

/**
 * Button styles and variants to allow
 * style component. Also can be used in any other element
 */
const buttonVariants = cva(
  'inline-flex items-center gap-3 justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-neutral-100 hover:bg-accent/90',
        outline:
          'border border-neutral-100 dark:border-neutral-800 hover:bg-neutral-100/60 hover:dark:bg-neutral-800/60',
        secondary:
          'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-100/60 hover:dark:bg-neutral-800/60',
        ghost: 'hover:bg-neutral-100 dark:hover:bg-neutral-800',
        link: 'hover:underline font-medium',
      },
      size: {
        base: 'h-10 px-4 py-2 ',
        sm: 'h-9 rounded-md px-3',
        md: 'h-11 px-5 rounded-xl',
        lg: 'h-12 rounded-xl px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'base',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

/**
 * ## Button
 *
 * Render the button component to show
 * the actions and event
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={mergeClass(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
