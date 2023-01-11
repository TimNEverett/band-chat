import { FC } from 'react'
import ChatIcon from '../common/Icons/ChatIcon'
import LibraryIcon from '../common/Icons/LibraryIcon'
import RecordModal from '../Record/RecordModal'

const Footer: FC = () => {
  return (
    <div className="flex divide-x h-full text-white">
      <div className="w-1/3 h-full flex justify-center items-center">
        <RecordModal />
      </div>
      <button className="w-1/3 h-full flex justify-center items-center">
        <ChatIcon />
      </button>
      <button className="w-1/3 h-full flex justify-center items-center">
        <LibraryIcon />
      </button>
    </div>
  )
}

export default Footer
