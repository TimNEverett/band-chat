import { FC } from 'react'
import { useChatContext } from '../../contexts/chat.context'
import { ChatMessageGroupType } from '../../types/CustomTypes'
import { ChatMessageGroup } from './ChatMessageGroup'
import { formatRelativeDate } from '../../utils/formatDate'

export const Chat: FC = () => {
  const { messages } = useChatContext()
  const groupedMessages: ChatMessageGroupType[] = []
  let currentGroup: ChatMessageGroupType | undefined
  messages.forEach((message) => {
    if (
      !currentGroup ||
      currentGroup.sender !== message.sender ||
      new Date(message.created_at).getTime() - new Date(currentGroup.date).getTime() > 1000 * 60 * 60 * 4 // 4 hours
    ) {
      currentGroup = { sender: message.sender, date: message.created_at, messages: [] }
      groupedMessages.push(currentGroup)
    }
    currentGroup.messages.push(message)
  })
  // for each group in groupedMessages find the latest message and set it as the date
  groupedMessages.forEach((group) => {
    group.date = group.messages[group.messages.length - 1].created_at
  })

  const isGap = (idx: number): boolean => {
    if (idx === 0) {
      return true
    }
    return formatRelativeDate(groupedMessages[idx].date) !== formatRelativeDate(groupedMessages[idx - 1].date)
  }

  return (
    <div className="flex flex-col space-y-2">
      {groupedMessages.map((group, idx) => {
        return (
          <div key={group.date}>
            {isGap(idx) && (
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-sm">{formatRelativeDate(group.date)}</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
            )}
            <ChatMessageGroup messageGroup={group} />
          </div>
        )
      })}
    </div>
  )
}
