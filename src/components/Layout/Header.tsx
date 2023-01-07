import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { Database } from '../../types/DatabaseTypes'
import Button from '../common/Button'

const Header = () => {
  const [loading, setLoading] = useState(false)
  const supabase = useSupabaseClient<Database>()

  const signOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    setLoading(false)
  }

  return (
    <div className="w-screen h-16 flex justify-end items-center px-2 border-b">
      <Button onClick={signOut} loading={loading}>
        sign out
      </Button>
    </div>
  )
}

export default Header
