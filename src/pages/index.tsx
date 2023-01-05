import { NextPage } from 'next'
import Layout from '../components/Layout/Layout'

const Home: NextPage = () => {
  return (
    <Layout title="home page" description="home page">
      <div className="flex flex-col justify-center items-center min-h-screen">Home Page</div>
    </Layout>
  )
}

export default Home
