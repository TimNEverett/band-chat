import { useUser } from '@supabase/auth-helpers-react'
import { FC, PropsWithChildren } from 'react'
import { useBandContext } from '../../contexts/band.context'
import { ChatMessageType } from '../../types/DBTypeAliases'
import { formatDate } from '../../utils/formatDate'

export const ChatMessage: FC<PropsWithChildren<{ message: ChatMessageType }>> = ({ message }) => {
  const { memberNameById } = useBandContext()
  const user = useUser()

  const isMe = user?.id === message.sender
  return (
    <div className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div className="flex flex-col max-w-[75%]">
        {!isMe && <div className="text-sm w-full">{memberNameById(message.sender)}</div>}
        <div className={`p-2 rounded-lg ${isMe ? 'bg-gray-300 text-black' : 'bg-secondary text-primary'}`}>
          {message.message}
        </div>
        <div className="text-sm w-full text-right">{formatDate(message.created_at)}</div>
      </div>
    </div>
  )
}
