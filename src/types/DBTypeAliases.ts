import { Database } from './DatabaseTypes'

export type Band = Database['public']['Tables']['band']['Row']
export type BandMember = Database['public']['Tables']['band_member']['Row']
