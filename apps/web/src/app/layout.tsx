import { ThemeProvider } from '@components/provider/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { FC } from 'react'
import { BaseLayoutProps } from '~/types/component'
import { QueryProvider } from '@components/provider/query-provider'

// define the fonts used from google
const dmSans = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Moving faster from digital goodie | DigiHub',
  description:
    'The best way to sell and buy digital products, template, design, code, books, site, wordpress, dashboard',
}

interface RootLayoutProps extends BaseLayoutProps {}

/**
 * Render the root layout for all of the child
 * will show in the tops of tree
 *
 * @returns {FC}
 */
const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${dmSans.className} text-base font-normal text-black bg-light leading-normal dark:bg-dark dark:text-neutral-100`}
      >
        <ThemeProvider defaultTheme="system" enableSystem attribute="class">
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
