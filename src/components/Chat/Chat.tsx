import { FC } from 'react'
import { useChatContext } from '../../contexts/chat.context'
import { ChatMessageType } from '../../types/DBTypeAliases'
import { ChatMessageGroupType } from '../../types/CustomTypes'
import { ChatMessageGroup } from './ChatMessageGroup'

export const Chat: FC = () => {
  const { messages } = useChatContext()

  const groupMessages = (messages: ChatMessageType[]) => {
    const groupedMessages: ChatMessageGroupType[] = []
    let currentGroup: ChatMessageGroupType | undefined
    messages.forEach((message) => {
      if (!currentGroup || currentGroup.sender !== message.sender) {
        currentGroup = { sender: message.sender, date: message.created_at, messages: [] }
        groupedMessages.push(currentGroup)
      }
      currentGroup.messages.push(message)
    })
    return groupedMessages
  }

  return (
    <div className="flex flex-col justify-end h-full">
      {groupMessages(messages).map((message) => (
        <ChatMessageGroup key={message.date} messageGroup={message} />
      ))}
    </div>
  )
}
