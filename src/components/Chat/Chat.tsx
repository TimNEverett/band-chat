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

  const GAP_TIME = 1000 * 60 * 60 * 24

  const isGap = (idx: number): boolean => {
    if (idx === 0) {
      return true
    }
    return new Date(groupedMessages[idx].date).getTime() - new Date(groupedMessages[idx - 1].date).getTime() >= GAP_TIME
  }

  return (
    <div className="flex flex-col justify-end h-full space-y-2">
      {groupedMessages.map((group, idx) => {
        return (
          <>
            <ChatMessageGroup key={group.date} messageGroup={group} />
            {isGap(idx) && <div className="w-full text-center">{formatRelativeDate(group.date)}</div>}
          </>
        )
      })}
    </div>
  )
}
