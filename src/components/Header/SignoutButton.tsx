import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { Database } from '../../types/DatabaseTypes'
import Button from '../common/Button'

const SignoutButton = () => {
  const [loading, setLoading] = useState(false)
  const supabase = useSupabaseClient<Database>()

  const signOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    setLoading(false)
  }
  return (
    <Button onClick={signOut} loading={loading}>
      sign out
    </Button>
  )
}

export default SignoutButton
