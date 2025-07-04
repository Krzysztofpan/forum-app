import type { Metadata } from 'next'

import './globals.css'

import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </>
  )
}
