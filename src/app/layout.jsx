import './globals.css'
import { Inter } from 'next/font/google'
import {Providers} from './Providers'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Green Karma',
  description: 'Green Karma Ecomerce',
  keywords: "tienda, online, ecommerce, limpieza, detergentes, productos, multiusos, ropa, autos, hogar, limpiadores, ambiente, reciclar, reciclaje, envase"
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
