// react input component
// use typescript and tailwindcss
// props: value, onChange, placeholder, type, className, disabled
import { FC, InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: 'text' | 'email' | 'password'
  className?: string
  disabled?: boolean
}

const Input: FC<InputProps> = ({ value, onChange, placeholder, type = 'text', className = '', disabled = false }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      className={`h-10 px-4 border rounded-full focus:outline-none ${className}`}
      disabled={disabled}
    />
  )
}

export default Input
