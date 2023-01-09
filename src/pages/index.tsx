import { NextPage } from 'next'
import { ChatWrapper } from '../components/Chat'
import Layout from '../components/Layout/Layout'

const Home: NextPage = () => {
  return (
    <Layout title="home page" description="home page">
      <div className="flex flex-col justify-center items-center h-full bg-gray-200 w-screen">
        <div className="flex-1 w-full">
          <ChatWrapper />
        </div>
      </div>
    </Layout>
  )
}

export default Home
