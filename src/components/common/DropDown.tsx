// make a dropdown component
import React, { FC, PropsWithChildren, ReactNode, useState } from 'react'
import Button from './Button'
import CaretDownIcon from './Icons.tsx/CaretDownIcon'

export const DropDown: FC<PropsWithChildren<{ buttonChildren: ReactNode | string }>> = ({
  children,
  buttonChildren,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen((prev) => !prev)
  return (
    <div className="relative flex-1">
      <Button onClick={toggle} className="pr-1 relative">
        <div className="flex">
          <div className="overflow-hidden whitespace-nowrap">{buttonChildren}</div>
          <div className="transition-transform duration-300">
            <CaretDownIcon />
          </div>
        </div>
      </Button>
      <div
        className={`absolute mt-2 border bg-white rounded-lg transition-all duration-200 overflow-hidden origin-top-left ${
          !isOpen ? 'opacity-0 scale-0' : 'shadow-xl delay-100'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
