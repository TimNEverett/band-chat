import { NextPage } from 'next'
import { ChatWrapper } from '../components/Chat'
import Layout from '../components/Layout/Layout'

const Home: NextPage = () => {
  return (
    <Layout title="home page" description="home page">
      <div className="flex flex-col w-full min-h-full bg-gray-200">
        <ChatWrapper />
      </div>
    </Layout>
  )
}

export default Home
