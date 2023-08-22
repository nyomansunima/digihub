import { SessionProvider } from 'next-auth/react'
import { FC, ReactNode } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

/**
 * ## AuthProvider
 *
 * provide context to allow using session
 * in client and server
 *
 * @returns {FC}
 */
const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export { AuthProvider }
