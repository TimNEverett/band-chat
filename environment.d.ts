declare global {
  namespace NodeJS {
    interface ProcessEnv {
      //supabase
      NEXT_PUBLIC_SUPABASE_URL: string
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string
      SUPABASE_SERVICE_KEY: string
      //vercel
      NEXT_PUBLIC_VERCEL_URL: string
      //custom
      API_SECRET: string
    }
  }
}

export {}
