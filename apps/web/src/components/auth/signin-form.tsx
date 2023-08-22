'use client'

import { Button } from '@components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { InferType, object, string } from 'yup'

const formSchema = object({
  email: string()
    .min(1, 'Please fill the email address')
    .email('Please use a valid email address'),
  password: string()
    .required('Please fill the password')
    .min(8, 'Password at least 8 character length'),
})

const SigninForm: FC = () => {
  const signinForm = useForm<InferType<typeof formSchema>>({
    mode: 'onTouched',
    resolver: yupResolver(formSchema) as any,
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const emailPassAuth = useMutation(
    async (formData: InferType<typeof formSchema>) => {},
  )

  return (
    <div className="flex flex-col w-7/12">
      <h2 className="text-4xl font-medium !leading-tight">
        Start explore the goodies.
      </h2>

      <div className="flex flex-col gap-3 mt-12">
        <Button variant={'outline'} size={'lg'}>
          <i className="fi fi-brands-google" />
          Continue with Google
        </Button>

        <Button variant={'secondary'} size={'lg'}>
          <i className="fi fi-brands-github" />
          Continue with Github
        </Button>
      </div>

      <span className="text-neutral-600 text-center my-6 text-[15px]">
        Or signin using
      </span>

      <Form {...signinForm}>
        <form
          onSubmit={signinForm.handleSubmit(emailPassAuth.mutate)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={signinForm.control}
            name={'email'}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signinForm.control}
            name={'password'}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end mt-3">
            <Button variant={'link'} asChild className="h-5">
              <Link href="/forgot-password">Forgot Password</Link>
            </Button>
          </div>

          <Button
            variant={'primary'}
            size={'lg'}
            type="button"
            className="mt-5"
          >
            Signin
          </Button>
        </form>
      </Form>
    </div>
  )
}

export { SigninForm }
