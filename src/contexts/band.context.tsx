// create a react context for supabase client
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Band, BandMember } from '../types/DBTypeAliases'
import { Database } from '../types/DatabaseTypes'
import { useLocalStorage } from '../components/hooks/useLocalStorage'

interface BandContext {
  band: Band | null
  bands: Band[]
  bandMembers: BandMember[]
  memberNameById: (id: string) => string
  selectBand: (band: Band) => void
}

export const BandContext = createContext<BandContext>({
  band: null,
  bands: [],
  bandMembers: [],
  memberNameById: (id: string) => id,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  selectBand: () => {},
})

export const BandContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const session = useSession()
  const supabase = useSupabaseClient<Database>()
  const [band, setBand] = useState<Band | null>(null)
  const [bands, setBands] = useState<Band[]>([])
  const [bandMembers, setBandMembers] = useState<BandMember[]>([])
  const [selectedBand, setSelectedBand] = useLocalStorage<Band | null>('selectedBand', null)

  const memberNameById = (id: string) => {
    const member = bandMembers.find((member) => member.member === id)
    return member?.name ? member.name : id.toString()
  }

  const selectBand = (band: Band) => {
    setBand(band)
  }

  useEffect(() => {
    const getBands = async () => {
      try {
        const { data: bands, error } = await supabase.from('band').select('*')
        if (error) throw error
        if (bands) {
          setBands(() => bands)
          // always use BE data incase band has been updated
          // if no selected band, use the first band
          const curBand = bands.find((b) => b.id === selectedBand?.id) || bands[0]
          setBand(curBand)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (session) getBands()
  }, [supabase, session])

  useEffect(() => {
    const getBandMembers = async (curBand: Band) => {
      try {
        const { data: bandMembers, error } = await supabase.from('band_member').select('*').eq('band', curBand.id)
        if (error) throw error
        if (bandMembers) setBandMembers(bandMembers)
      } catch (error) {
        console.log(error)
      }
    }
    if (band) getBandMembers(band)
    // update local storage whenever band changes
    setSelectedBand(band)
  }, [band])

  return (
    <BandContext.Provider value={{ band, bands, bandMembers, memberNameById, selectBand }}>
      {children}
    </BandContext.Provider>
  )
}

export const useBandContext = () => useContext(BandContext)
