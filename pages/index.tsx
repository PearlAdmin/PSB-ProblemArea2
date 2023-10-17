import { NextPage } from "next"
import Head from 'next/head'
import Navbar from "@/components/navigation"

const Home: NextPage = () => {

  return (
    <div>
      <Navbar/>
      <div>Home</div>
    </div>
  )
}

export default Home;