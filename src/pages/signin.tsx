import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from '../types/DatabaseTypes'
import { NextPage } from 'next'
import Button from '../components/common/Button'
import { useState } from 'react'
import Input from '../components/common/Input'

const SigninPage: NextPage = () => {
  const supabaseClient = useSupabaseClient<Database>()
  const [email, setEmail] = useState('')
  const [linkSent, setLinkSent] = useState(false)
  const [error, setError] = useState('')

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
    const { error } = await supabaseClient.auth.signInWithOtp({ email })
    if (error) setError(error.message)
    else setLinkSent(true)
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
    <div
      className={`w-screen h-screen flex justify-center items-center ${
        linkSent ? 'bg-gradient-to-r from-blue-400 to-orange-500 via-purple-500 animate-gradient-xy' : 'bg-black'
      }`}
    >
      {!linkSent && (
        <form onSubmit={sendMagicLink} className="flex flex-col items-center space-y-8 w-5/6 md:w-1/2 lg:w-1/4">
          <div className="max-w-full">
            <Input value={email} onChange={onEmailChange} placeholder="enter email" type="email" />
          </div>
          <Button
            type="submit"
            className={`hover:bg-gradient-to-r 
from-blue-400 
to-orange-500 
via-purple-500
hover:animate-gradient-xy ${email.length == 0 && !linkSent ? 'invisible' : ''}`}
          >
            Get a magic link
          </Button>
        </form>
      )}
      {linkSent && (
        <div className={`text-white text-center`}>
          <p className="text-lg">It&apos;s on the way!</p>
          <div className="mt-8">
            <div>didn&apos;t work?</div>
            <button className="ml-1 underline" onClick={reset}>
              try again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SigninPage
