import { Inter } from 'next/font/google'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Session from '@/components/session';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pearl S. Buck PH',
  description: 'Remote Database for Pearl S. Buck Philippines',
}

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <Session/>
          {children}
        </body>
      </html>
  )
}
