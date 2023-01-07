import { useUser } from '@supabase/auth-helpers-react'
import { FC, PropsWithChildren } from 'react'
import { ChatMessageType } from '../../types/DBTypeAliases'

export const ChatMessage: FC<PropsWithChildren<{ message: ChatMessageType }>> = ({ message }) => {
  const user = useUser()

  const isMe = user?.id === message.sender
  return (
    <div className={`p-2 rounded-lg ${isMe ? 'bg-gray-300 text-black' : 'bg-secondary text-primary'}`}>
      {message.message}
    </div>
  )
}
