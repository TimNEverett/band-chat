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
      <div className="flex flex-col h-screen w-screen">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </>
  )
}

export default Layout
