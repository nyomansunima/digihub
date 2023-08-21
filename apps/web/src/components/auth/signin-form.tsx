'use client'

import { Button } from '@components/ui/button'
import { Form } from '@components/ui/form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { signinFormValidaton } from '~/lib/validation/auth-validation'

const SigninForm: FC = () => {
  const signinForm = useForm({
    mode: 'onTouched',
    resolver: yupResolver(signinFormValidaton),
  })

  const emailPassAuth = useMutation(async (formData: any) => {})

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

      <Form context={signinForm} onSave={emailPassAuth.mutate}></Form>
    </div>
  )
}

export { SigninForm }
