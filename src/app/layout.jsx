import './globals.css'
import { Inter } from 'next/font/google'
import { NavbarSimple } from '@/components/Navbar'
import Footer from '@/components/Footer'
import {Providers} from './Providers'
import Chat from '@/components/whats'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Green Karma',
  description: 'Green Karma',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

          <Providers>
            {children}
          </Providers>
      </body>
    </html>
  )
}
