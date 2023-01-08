import { useUser } from '@supabase/auth-helpers-react'
import { FC } from 'react'
import { useBandContext } from '../../contexts/band.context'
import { ChatMessageGroupType } from '../../types/CustomTypes'
import { formatDate, formatRelativeDate } from '../../utils/formatDate'
import { ChatMessage } from './ChatMessage'

export const ChatMessageGroup: FC<{ messageGroup: ChatMessageGroupType }> = ({ messageGroup }) => {
  const { memberNameById } = useBandContext()
  const user = useUser()

  const isMe = user?.id === messageGroup.sender
  return (
    <div className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div className="flex flex-col max-w-[75%]">
        {!isMe && <div className="text-sm w-full">{memberNameById(messageGroup.sender)}</div>}
        <div className="space-y-[2px]">
          {messageGroup.messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </div>
    </div>
  )
}
