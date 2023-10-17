import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import Head from 'next/head';
import Link from 'next/link'

// bootstrap integration
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'


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
    <Head>
      <title>Pearl S. Buck</title>
      <link
        rel='icon'
        href='/logo.png'
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Component {...pageProps} />
  </SessionProvider>
  )
}
