import React, { FC, PropsWithChildren } from 'react'

type SpinnerProps = {
  color?: 'white' | 'black'
}

const Spinner: FC<PropsWithChildren<SpinnerProps>> = ({ color }) => {
  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin h-8 w-8 rounded-full border-y border-${color}`}></div>
    </div>
  )
}

export default Spinner
