export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      band: {
        Row: {
          id: string
          created_at: string
          name: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
        }
      }
      band_member: {
        Row: {
          id: number
          joined_at: string
          band: string
          member: string
          name: string | null
        }
        Insert: {
          id?: number
          joined_at?: string
          band: string
          member: string
          name?: string | null
        }
        Update: {
          id?: number
          joined_at?: string
          band?: string
          member?: string
          name?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
