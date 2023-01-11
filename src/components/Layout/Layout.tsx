import { FC, PropsWithChildren } from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

type LayoutProps = {
  title: string
  description: string
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, title, description }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="flex flex-col min-h-screen w-screen relative justify-center items-center">
        <div className="fixed w-full z-20 h-16 max-w-desktop top-0">
          <Header />
        </div>

        <main className="pt-16">{children}</main>
        <div className="sticky bottom-0 w-full h-16 bg-black max-w-desktop">
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout
