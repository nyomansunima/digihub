'use client'

import { Button } from '@components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { yupResolver } from '@hookform/resolvers/yup'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { InferType, object, string } from 'yup'
import { apiConnection } from '~/utils/api-connection'
import { useRouter } from 'next/navigation'
import { secureEmailView } from '~/utils/hide-email'
import { useToast } from '@components/ui/toaster'

const formSchema = object({
  verificationCode: string().min(1, 'Plese fill the verification code'),
})

interface VerifyEmailFormProps {
  email: string
}

/**
 * Render the form to verify email address
 * and resend new email address for verification
 *
 * @returns {FC}
 */
const VerifyEmailForm: FC<VerifyEmailFormProps> = ({ email }) => {
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<InferType<typeof formSchema>>({
    mode: 'onTouched',
    resolver: yupResolver(formSchema as any),
    defaultValues: { verificationCode: '' },
  })

  const verifyEmailCode = useMutation(
    async (formData: InferType<typeof formSchema>) => {
      const { verificationCode } = formData

      return await apiConnection<any>('/auth/email-verification', {
        method: 'POST',
        body: {
          verificationCode,
        },
        auth: true,
      })
    },
    {
      onSuccess: () => {
        router.push('/')
      },
      onError: (error: any) => {
        if (error.message == 'auth/invalid-email-token-code') {
          form.setError('verificationCode', {
            message: 'Opps, your verification code looks weird.',
          })
        } else {
          toast({
            title: 'Failed',
            description:
              'Opps, something wrong when try to verify your account. Please try again.',
          })
        }
      },
    },
  )

  const resendEmailVerification = useMutation(
    async () => {
      return await apiConnection<any>('/auth/resend-email-verification', {
        method: 'POST',
        auth: true,
      })
    },
    {
      onError: () => {
        toast({
          title: 'Success',
          description: 'Please check your inbox to see verification code',
        })
      },
      onSuccess: () => {
        toast({
          title: 'Failed send verification',
          description:
            'Something happen when try to send you email verification. Please try again.',
        })
      },
    },
  )

  return (
    <div className="flex flex-col laptop:w-7/12">
      <h2 className="text-2xl laptop:text-4xl font-medium !leading-tight">
        Verify your email address.
      </h2>
      <p className="mt-5 leading-relaxed text-neutral-600 dark:text-neutral-300">
        We send an email to <strong>{secureEmailView(email)}</strong>. Please
        check yout inbox and get the actual code to verify. Please resend email
        if you are not get one.
      </p>

      <div className="flex flex-col gap-3 mt-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((e) => verifyEmailCode.mutate(e))}
            className="flex flex-col"
          >
            <FormField
              name="verificationCode"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Your verification code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <Button
              disabled={verifyEmailCode.isLoading}
              type="submit"
              variant={'primary'}
              size={'md'}
              className="mt-4"
            >
              {verifyEmailCode.isLoading ? (
                <>
                  Verifying ...
                  <i className="fi fi-rr-spinner absolute right-4" />
                </>
              ) : (
                'Verify'
              )}
            </Button>

            <Button
              disabled={resendEmailVerification.isLoading}
              onClick={() => resendEmailVerification.mutate()}
              type="button"
              variant={'ghost'}
              size={'md'}
              className="mt-3"
            >
              {resendEmailVerification.isLoading ? (
                <>
                  Sending email ...
                  <i className="fi fi-rr-spinner absolute right-4" />
                </>
              ) : (
                'Resend email'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export { VerifyEmailForm }
