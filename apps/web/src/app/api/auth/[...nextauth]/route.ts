import NextAuth from 'next-auth'
import { authOptions } from '~/lib/config/auth'

/**
 * ## handler
 *
 * handle the authentication in web interface
 * using special provider inclue google, github, and even credential
 * everything is manage and setup on the authOptions
 */
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
