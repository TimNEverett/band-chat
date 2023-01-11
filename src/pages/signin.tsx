import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from '../types/DatabaseTypes'
import { NextPage } from 'next'
import Button from '../components/common/Button'
import { useState } from 'react'
import Input from '../components/common/Input'
import { useRouter } from 'next/router'

const SigninPage: NextPage = () => {
  const supabaseClient = useSupabaseClient<Database>()
  const [email, setEmail] = useState('')
  const [linkSent, setLinkSent] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setEmail(e.target.value)
  }

  const reset = () => {
    setEmail('')
    setLinkSent(false)
  }

  const sendMagicLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error } = await supabaseClient.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_VERCEL_URL,
        shouldCreateUser: false, // invite only for now
      },
    })
    if (error) setError(error.message)
    else router.push('/otp?email=' + email)
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
      </div>
    )

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <form onSubmit={sendMagicLink} className="flex flex-col items-center space-y-8 w-2/3 sm:w-1/3 lg:w-1/5">
        <div className="w-full">
          <Input
            value={email}
            onChange={onEmailChange}
            placeholder="enter email"
            type="email"
            className="w-full text-center"
          />
        </div>
        <Button
          type="submit"
          className={`hover:bg-gradient-to-r from-blue-400 to-orange-500 via-purple-500 hover:animate-gradient-xy ${
            email.length == 0 && !linkSent ? 'invisible' : ''
          }`}
        >
          Get a magic link
        </Button>
      </form>
    </div>
  )
}

export default SigninPage
