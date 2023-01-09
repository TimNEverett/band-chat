import { useEffect, useState } from 'react'

// make a hook that can read and write to local storage using generics
export const useLocalStorage = <T,>(key: string) => {
  const [value, setValue] = useState<T | null>(null)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const stored = localStorage.getItem(key)
    setValue(stored ? JSON.parse(stored) : null)
    setLoaded(true)
  }, [key])

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue, loaded] as const
}
