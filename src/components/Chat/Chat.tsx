import { FC } from 'react'
import { useChatContext } from '../../contexts/chat.context'
import { ChatMessage } from './ChatMessage'

export const Chat: FC = () => {
  const { messages } = useChatContext()
  return (
    <div className="flex flex-col justify-end h-full">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  )
}