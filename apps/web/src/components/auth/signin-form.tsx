'use client'

import { Button } from '@components/ui/button'
import { signIn } from 'next-auth/react'
import { FC } from 'react'

/**
 * Render teh signin form including the other oauth methods
 * @returns {FC}
 */
const SigninForm: FC = () => {
  return (
    <div className="flex flex-col w-7/12">
      <h2 className="text-4xl font-medium !leading-tight">
        Start explore the goodies.
      </h2>

      <div className="flex flex-col gap-3 mt-12">
        <Button
          onClick={() => signIn('google', { redirect: false })}
          variant={'outline'}
          size={'lg'}
        >
          <i className="fi fi-brands-google" />
          Continue with Google
        </Button>

        <Button
          onClick={() => signIn('github', { redirect: false })}
          variant={'secondary'}
          size={'lg'}
        >
          <i className="fi fi-brands-github" />
          Continue with Github
        </Button>
      </div>
    </div>
  )
}

export { SigninForm }
