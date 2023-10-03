import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <p>Insert here the List of Records</p>
    </main>
  )
}
