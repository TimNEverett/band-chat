import { FC } from 'react'
import { ChatContextProvider } from '../../contexts/chat.context'
import { Chat } from './Chat'
import { ChatInput } from './ChatInput'
import NewMessagesCTA from './NewMessagesCTA'

export const ChatWrapper: FC = () => {
  return (
    <ChatContextProvider>
      <div className="flex flex-col h-full justify-end">
        <div className="flex justify-end px-4 h-full">
          <Chat />
        </div>
        <NewMessagesCTA />
        <div className="sticky bottom-16 w-full max-w-desktop h-14 pt-1 bg-gray-200 px-4">
          <ChatInput />
        </div>
      </div>
    </ChatContextProvider>
  )
}
