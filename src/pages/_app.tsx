import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { Database } from '../types/DatabaseTypes'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import { BandContextProvider } from '../contexts/band.context'

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient<Database>())
  const router = useRouter()

  useEffect(() => {
    // setup supabase auth listener
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_IN' && router.pathname === '/signin') {
        await router.push('/')
      } else if (event === 'SIGNED_OUT' && router.pathname !== '/auth/signin') {
        await router.push('/signin')
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [supabaseClient])

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
      <BandContextProvider supabase={supabaseClient}>
        <Component {...pageProps} />
      </BandContextProvider>
    </SessionContextProvider>
  )
}
