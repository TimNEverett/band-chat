import { FC } from 'react'
import Icon from '../common/Icons/Icon'
import RecordModal from '../Record/RecordModal'

const Footer: FC = () => {
  return (
    <div className="flex divide-x h-full text-white">
      <div className="w-1/3 h-full flex justify-center items-center pb-2">
        <RecordModal />
      </div>
      <button className="w-1/3 h-full flex justify-center items-center pb-2">
        <Icon path="chat" size="md" />
      </button>
      <button className="w-1/3 h-full flex justify-center items-center pb-2">
        <Icon path="library" size="md" />
      </button>
    </div>
  )
}

export default Footer
