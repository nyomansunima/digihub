import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Handle the protection between the
 * routes and the configs for each pages
 *
 * @param request server body request
 */
const middleware = async (req: NextRequest) => {
  const token = await getToken({ req })
  const path = req.nextUrl.pathname

  if (token && path.includes('/signin')) {
    return NextResponse.redirect(new URL('/', req.url))
  }
}

export default middleware

// configs for the
// middleware
export const config = { matcher: ['/signin'] }
