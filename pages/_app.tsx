import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps }
}: AppProps<{
  session: Session
}>) {
  return (
  // Use of the <SessionProvider> is mandatory to allow components that call
  // `useSession()` anywhere in your application to access the `session` object.
  <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
  )
}
