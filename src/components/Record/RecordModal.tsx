import { FC, useState } from 'react'
import ModalSheet from '../common/ModalSheet'
import Button from '../common/Button'
import MicIcon from '../common/Icons/MicIcon'

const RecordModal: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  return (
    <>
      <Button onClick={openModal}>
        <MicIcon />
      </Button>
      <ModalSheet title="new recording" isOpen={isOpen} onClose={closeModal}>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <div className="bg-gray-200 rounded-full w-24 h-24 flex items-center justify-center">
              <MicIcon />
            </div>
          </div>
          <div className="mt-4">
            <Button>record</Button>
          </div>
        </div>
      </ModalSheet>
    </>
  )
}

export default RecordModal
