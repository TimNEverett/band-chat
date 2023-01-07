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
      chat_message: {
        Row: {
          id: number
          created_at: string
          sender: string
          message: string
          band: string
        }
        Insert: {
          id?: number
          created_at?: string
          sender?: string
          message: string
          band: string
        }
        Update: {
          id?: number
          created_at?: string
          sender?: string
          message?: string
          band?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      belongs_to_band: {
        Args: { _user_id: string; _band_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
