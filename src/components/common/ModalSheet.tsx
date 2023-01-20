// a react component that is a modal on desktop and a sheet on mobile

import React, { FC, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import Icon from './Icons/Icon'

type ModalSheetProps = {
  isOpen?: boolean
  onClose?: () => void
  title: string
}

const ModalSheet: FC<PropsWithChildren<ModalSheetProps>> = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null
  return createPortal(
    <div className="fixed inset-0 z-30 flex items-end sm:items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-2xl w-full z-50 min-h-[50%] sm:min-h-0 flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <Icon path="close" size="md" />
          </button>
        </div>
        <div className="mt-4 flex-1 flex flex-col justify-center items-center">{children}</div>
      </div>
    </div>,
    document.body,
  )
}

export default ModalSheet
