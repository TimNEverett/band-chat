import { FC, PropsWithChildren } from 'react'
import Spinner from './Spinner'

type ButtonProps = {
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  disabled,
  loading,
  onClick,
  children,
  type = 'button',
  className,
}) => {
  return (
    <button
      className={`bg-black text-white font-bold py-2 px-4 rounded relative
        ${disabled && 'opacity-50 cursor-not-allowed'}
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      <div className={`${loading && 'opacity-0'}`}>{children}</div>
      <div className={`absolute top-0 left-0 w-full h-full flex justify-center items-center ${!loading && 'hidden'}`}>
        <Spinner />
      </div>
    </button>
  )
}

export default Button
