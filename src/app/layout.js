import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next Blog',
  description: 'Blog example project',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
