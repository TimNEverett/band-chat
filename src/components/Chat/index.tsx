import { FC } from 'react'
import { ChatContextProvider } from '../../contexts/chat.context'
import { Chat } from './Chat'

export const ChatWrapper: FC = () => {
  return (
    <ChatContextProvider>
      <Chat />
    </ChatContextProvider>
  )
}
