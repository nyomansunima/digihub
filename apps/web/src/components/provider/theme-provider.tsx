'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { ThemeProviderProps as NextThemeProviderProps } from 'next-themes/dist/types'
import { FC } from 'react'

interface ThemeProviderProps extends NextThemeProviderProps {}

/**
 * ## ThemeProvider
 *
 * handle the theme change system default theme context
 * will maintain the ability to chnage and set color schema for app
 *
 * @returns {FC}
 */
const ThemeProvider: FC<ThemeProviderProps> = ({ children, ...props }) => {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>
}

export { ThemeProvider }
