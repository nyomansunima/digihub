'use client'

import { Button } from '@components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { useToast } from '@components/ui/toaster'
import { yupResolver } from '@hookform/resolvers/yup'
import { FC, ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { InferType, object, string } from 'yup'

const formSchema = object({
  name: string().min(1, 'Please add the store name').required(),
  username: string().min(1, 'Please add the store username').required(),
  email: string()
    .min(1, 'Please add the email')
    .email('Opps, your email looks weird')
    .required(),
  phoneNumber: string(),
  about: string(),
})

/**
 * ## UpdateStoreForm
 *
 * Render the udpate store from manager
 *
 * @returns {ReactElement}
 */
const UpdateStoreForm: FC = (): ReactElement => {
  const { toast } = useToast()

  const form = useForm<InferType<typeof formSchema>>({
    // resolver: yupResolver(formSchema) as any,
  })

  const update = useMutation(
    async (formData: InferType<typeof formSchema>) => {
      return {}
    },
    {
      onError: () => {
        toast({
          title: 'Failed',
          description: 'Something error when try to update store',
          variant: 'error',
        })
      },
      onSuccess: () => {
        toast({
          icon: 'fi fi-rr-check-circle',
          title: 'Udpated',
          description: 'The store is updated',
          variant: 'success',
        })
      },
    },
  )

  return (
    <Card className="w-full">
      <CardHeader className="border-b border-b-neutral-100">
        <CardTitle>Basic</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4 mt-10"
            onSubmit={form.handleSubmit((formData) => update.mutate(formData))}
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your store name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your store username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phoneNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="about"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your store name"
                      {...field}
                      className="h-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant={'primary'}
              size={'md'}
              disabled={update.isLoading}
              className="mt-14"
            >
              {!update.isLoading ? (
                'Update store'
              ) : (
                <>
                  Updating store
                  <i className="fi fi-rr-spinner animate-spin duration-1000 absolute right-4" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default UpdateStoreForm
