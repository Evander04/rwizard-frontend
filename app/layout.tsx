import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Head from 'next/head'
import { MainLayout } from '@/components/layout/mainLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rwizard',
  description: 'Magic is begin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
    <Head>
      <title>Rwizard</title>      
    </Head>     
    <body className='min-h-screen'>
      <Providers>
        <MainLayout>
          {children}
        </MainLayout>                        
      </Providers>
    </body>
    </html>
  )
}
