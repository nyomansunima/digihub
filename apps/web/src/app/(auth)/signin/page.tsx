import { SigninForm } from '@components/auth/signin-form'
import { Metadata } from 'next'
import Image from 'next/image'
import { FC } from 'react'

export const metadata: Metadata = {
  title: 'Signin | DigiHub',
  description: 'Start explore the goodies',
}

const SigninPage: FC = () => {
  return (
    <main className="flex h-screen w-screen">
      <section className="flex flex-col w-1/2 justify-center items-center">
        <SigninForm />
      </section>
      <section className="flex justify-center items-center w-1/2 bg-[#5F35FF] my-2 mr-2 rounded-2xl">
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
