// create a react context for supabase client
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { SupabaseClient, useSession } from '@supabase/auth-helpers-react'
import { Band, BandMember } from '../types/DBTypeAliases'
import { Database } from '../types/DatabaseTypes'

interface BandContext {
  band: Band | null
  bandMembers: BandMember[]
  memberNameById: (id: string) => string
}

export const BandContext = createContext<BandContext>({
  band: null,
  bandMembers: [],
  memberNameById: (id: string) => id,
})

export const BandContextProvider: FC<PropsWithChildren<{ supabase: SupabaseClient<Database, 'public', any> }>> = ({
  children,
  supabase,
}) => {
  const session = useSession()
  const [band, setBand] = useState<Band | null>(null)
  const [bandMembers, setBandMembers] = useState<BandMember[]>([])

  const memberNameById = (id: string) => {
    const member = bandMembers.find((member) => member.member === id)
    return member?.name ? member.name : id.toString()
  }

  useEffect(() => {
    const effect = async () => {
      try {
        const { data: band, error } = await supabase.from('band').select('*').single()
        if (error) throw error
        if (band) {
          setBand(band)
          const { data: bandMembers, error } = await supabase.from('band_member').select('*').eq('band', band.id)
          if (error) throw error
          if (bandMembers) setBandMembers(bandMembers)
        }
      } catch (error) {}
    }
    if (session) effect()
  }, [supabase, session])

  return <BandContext.Provider value={{ band, bandMembers, memberNameById }}>{children}</BandContext.Provider>
}

export const useBandContext = () => useContext(BandContext)
