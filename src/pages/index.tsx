import { NextPage } from 'next'
import { ChatWrapper } from '../components/Chat'
import Layout from '../components/Layout/Layout'

const Home: NextPage = () => {
  return (
    <Layout title="home page" description="home page">
      <div className="flex flex-col justify-center items-center h-full w-screen">
        <div className="flex-1 w-full max-w-desktop bg-gray-200 ">
          <ChatWrapper />
        </div>
      </div>
    </Layout>
  )
}

export default Home
