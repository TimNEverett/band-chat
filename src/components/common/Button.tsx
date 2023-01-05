import { FC, PropsWithChildren } from 'react'
import Spinner from './Spinner'

type ButtonProps = {
  disabled?: boolean
  loading?: boolean
  onClick: () => void
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ disabled, loading, onClick, children }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded relative"
      disabled={disabled}
      onClick={onClick}
    >
      <div className={`${loading && 'opacity-0'}`}>{children}</div>
      <div className={`absolute top-0 left-0 w-full h-full flex justify-center items-center ${!loading && 'hidden'}`}>
        <Spinner />
      </div>
    </button>
  )
}

export default Button
