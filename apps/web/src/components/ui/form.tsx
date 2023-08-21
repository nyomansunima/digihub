import { FC, HTMLAttributes, HtmlHTMLAttributes } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'

interface FormProps
  extends HTMLAttributes<HTMLFormElement>,
    HtmlHTMLAttributes<HTMLFormElement> {
  context: UseFormReturn
  onSave: (data: any) => void
}

/**
 * ## Button
 *
 * Render form element that provide the
 * form context for each input children
 *
 * @returns {FC}
 */
const Form: FC<FormProps> = ({ context, children, onSave, ...props }) => {
  const { handleSubmit } = context

  return (
    <FormProvider {...context}>
      <form {...props} onSubmit={handleSubmit(onSave)}>
        {children}
      </form>
    </FormProvider>
  )
}

interface BaseInputProps
  extends HtmlHTMLAttributes<HTMLInputElement>,
    HtmlHTMLAttributes<HTMLInputElement> {
  label?: string
  name: string
}

export { Form }
