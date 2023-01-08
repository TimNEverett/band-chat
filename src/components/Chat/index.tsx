import { FC } from 'react'
import { ChatContextProvider } from '../../contexts/chat.context'
import { Chat } from './Chat'
import { ChatInput } from './ChatInput'

export const ChatWrapper: FC = () => {
  return (
    <ChatContextProvider>
      <div className="flex flex-col h-full py-4 space-y-2">
        <div className="flex-1">
          <Chat />
        </div>
        <ChatInput />
      </div>
    </ChatContextProvider>
  )
}
