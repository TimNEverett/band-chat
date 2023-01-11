// react input component
// use typescript and tailwindcss
// props: value, onChange, placeholder, type, className, disabled
import React, { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: 'text' | 'email' | 'password'
  className?: string
  disabled?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, placeholder, type = 'text', className = '', disabled = false }, forwardedRef) => {
    return (
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        className={`h-10 px-4 border rounded-full focus:outline-none ${className}`}
        disabled={disabled}
        ref={forwardedRef}
      />
    )
  },
)

Input.displayName = 'Input'

export default Input
