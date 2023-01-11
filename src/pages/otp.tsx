import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from '../types/DatabaseTypes'
import { NextPage } from 'next'
import Button from '../components/common/Button'
import { useEffect, useState } from 'react'
import Input from '../components/common/Input'
import Link from 'next/link'
import { useRouter } from 'next/router'

const OTPPage: NextPage = () => {
  const supabaseClient = useSupabaseClient<Database>()
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const { query } = useRouter()

  useEffect(() => {
    if (query.email) setEmail(query.email as string)
  }, [query.email])

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setEmail(e.target.value)
  }

  const onTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setToken(e.target.value)
  }

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error } = await supabaseClient.auth.verifyOtp({
      token,
      email,
      type: 'magiclink',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL,
      },
    })
    if (error) setError(error.message)
  }

  if (error)
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-black text-white">
        <div className="text-xl text-red-600">ERROR:</div>
        <div className="text-xl">{error}</div>
        <br />
        <div className="text-xl">Ask Tim about it</div>
        <br />
        <div>Don&apos;t know tim? That sucks.</div>
        <br />
        <button className="text-xl border border-white rounded-xl px-4 py-2" onClick={() => setError('')}>
          try again
        </button>
        <br />
        <div>or</div>
        <br />
        <Link href="/signin" className="text-xl border border-white rounded-xl px-4 py-2">
          get a new code
        </Link>
      </div>
    )

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-black">
      <form onSubmit={signIn} className="flex flex-col items-center space-y-8 w-2/3 sm:w-1/3 lg:w-1/5">
        <div className="w-full">
          <Input
            value={email}
            onChange={onEmailChange}
            placeholder="enter email"
            type="email"
            className="w-full text-center"
          />
        </div>
        <div className="w-full">
          <Input
            value={token}
            onChange={onTokenChange}
            placeholder="enter your code"
            type="text"
            className="w-full text-center"
          />
        </div>
        <Button
          type="submit"
          className={`bg-gradient-to-r from-blue-400 to-orange-500 via-purple-500 animate-gradient-xy ${
            email.length == 0 || token.length < 6 ? 'invisible' : ''
          }`}
        >
          LFG
        </Button>
      </form>
    </div>
  )
}

export default OTPPage
