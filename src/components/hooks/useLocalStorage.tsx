import { useEffect, useState } from 'react'

// make a hook that can read and write to local storage using generics
export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue)
  useEffect(() => {
    const stored = localStorage.getItem(key)
    setValue(stored ? JSON.parse(stored) : initialValue)
  }, [initialValue, key])

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
