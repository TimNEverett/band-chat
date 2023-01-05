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
      <div className="min-h-full w-full">
        <Header />
        <main className="">{children}</main>
      </div>
    </>
  )
}

export default Layout
