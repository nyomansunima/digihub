import * as React from 'react'
import { mergeClass } from '~/utils/style'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * ## Input
 *
 * Render  the input type component to working with
 * form
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={mergeClass(
          'flex h-10 w-full items-center rounded-xl ring-1 ring-neutral-100 dark:ring-neutral-800 outline-transparent border-transparent bg-transparent px-3 text-base ring-offset-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-600 focus-visible:outline-none focus-visible:border-transparent focus-visible:ring-[1.5px] focus-visible:ring-black disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
