import { FC, useState } from 'react'
import ModalSheet from '../common/ModalSheet'
import Button from '../common/Button'
import MicIcon from '../common/Icons/MicIcon'
import RecordWrapper from '.'
import Icon from '../common/Icons/Icon'

const RecordModal: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  return (
    <>
      <Button onClick={openModal}>
        <Icon size="lg">
          <MicIcon />
        </Icon>
      </Button>
      <ModalSheet title="new recording" isOpen={isOpen} onClose={closeModal}>
        <RecordWrapper />
      </ModalSheet>
    </>
  )
}

export default RecordModal
