import { Inter } from 'next/font/google'
import Header from '@/components/Header/Header'
import { Providers } from '@/components/Providers/Providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next Blog',
  description: 'Next Blog project',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
