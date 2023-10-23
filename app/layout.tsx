import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from '@/components/bootstrap';
import AuthProvider from './context/AuthProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pearl S. Buck',
  description: 'Remote Database Access for Pearl S. Buck Philippines.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Container>
            {children}
          </Container>
        </AuthProvider>
      </body>
    </html>
  )
}
