import { AppProps } from 'next/app'
import '../styles/index.css'
import { ReactElement } from 'react'

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <div className="lowercase">
      <Component {...pageProps} />
    </div>
  )
}
