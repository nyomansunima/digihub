import { VerifyEmailForm } from '@components/auth/verify-email-form'
import { Metadata } from 'next'
import { Session, getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { authOptions } from '~/lib/config/auth'

export const metadata: Metadata = {
  title: 'Verify Email | DigiHub',
  description: 'Verify your email address to activate',
}

// redirect the user
// when user is already verified
const checkUserVerification = (session: Session | null) => {
  if (session && session.user.verified) {
    redirect('/')
  }
}

const VerifyEmailPage = async () => {
  const session = await getServerSession(authOptions)
  checkUserVerification(session)

  return (
    <main className="flex h-screen w-screen">
      <section className="flex flex-col px-5 laptop:px-0 laptop:w-1/2 justify-center items-center">
        <VerifyEmailForm email={session?.user.email || ''} />
      </section>
      <section className="hidden laptop:flex justify-center items-center w-1/2 bg-[#FFD7EF] dark:bg-[#393036] my-2 mr-2 rounded-2xl">
        <Image
          src="/images/illustrations/listen_podcasts.svg"
          height="518"
          width="518"
          alt="Login"
        />
      </section>
    </main>
  )
}

export default VerifyEmailPage
