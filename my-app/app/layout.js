import { Inter } from 'next/font/google'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container } from './components/bootstrap';
// import AuthProvider from './context/AuthProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pearl S. Buck',
  description: 'Remote Database Access for Pearl S. Buck Philippines.',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Container>
            {/* <AuthProvider> */}
              {children}
            {/* </AuthProvider> */}
          </Container>
        </main>
      </body>
    </html>
  )
}