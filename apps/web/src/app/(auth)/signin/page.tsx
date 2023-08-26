import { SigninForm } from '@components/auth/signin-form'
import { Button } from '@components/ui/button'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export const metadata: Metadata = {
  title: 'Signin | DigiHub',
  description: 'Start explore the goodies',
}

const SigninPage: FC = () => {
  return (
    <main className="flex h-screen w-screen">
      <section className="flex flex-col px-5 laptop:px-0 laptop:w-1/2 justify-center items-center">
        <Button
          asChild
          variant={'outline'}
          size={'sm'}
          className="absolute top-6 laptop:left-24 left-5"
        >
          <Link href={'/'}>
            <i className="fi fi-rr-arrow-left" />
            Back
          </Link>
        </Button>
        <SigninForm />
      </section>
      <section className="hidden laptop:flex justify-center items-center w-1/2 bg-[#5F35FF] dark:bg-[#23155B] my-2 mr-2 rounded-2xl">
        <Image
          src="/images/illustrations/call_waiting.svg"
          height="518"
          width="518"
          alt="Login"
        />
      </section>
    </main>
  )
}

export default SigninPage
