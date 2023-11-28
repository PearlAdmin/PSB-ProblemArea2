import { Inter } from 'next/font/google'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const inter = Inter({ subsets: ['latin'] });

/**
 * Metadata for the application.
 * 
 * @constant
 * @returns {Object} The metadata for the application.
 */
export const metadata = {
  title: 'Pearl S. Buck PH',
  description: 'Remote Database for Pearl S. Buck Philippines',
}

/**
 * Root layout component.
 * 
 * @component
 * 
 * @param {Object} children - all the other components and pages.
 * @returns {JSX.Element} The Root Layout component.
 */
export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body className={inter.className}>
          {/* <Session/> */}
          {children}
        </body>
      </html>
  )
}
