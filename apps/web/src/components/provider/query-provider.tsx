'use client'

import { FC, ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

interface QueryProviderProps {
  children: ReactNode
}

/**
 * ## QueryProvider
 *
 * provide context when using react query
 * allow to add cache into children component when doing data fetching
 *
 * @returns {FC}
 */
const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export { QueryProvider }
