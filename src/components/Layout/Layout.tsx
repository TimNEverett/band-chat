import { FC, PropsWithChildren } from 'react'
import Head from 'next/head'
import Header from './Header'

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
      <div className="flex min-h-screen w-screen relative justify-center">
        <div className="fixed w-full z-20 h-16 max-w-desktop">
          <Header />
        </div>

        <main className="pt-16">{children}</main>
      </div>
    </>
  )
}

export default Layout
