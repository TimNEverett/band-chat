import { FC, useEffect, useState } from 'react'
import { useChatContext } from '../../contexts/chat.context'
import { ChatMessageType } from '../../types/DBTypeAliases'
import Icon from '../common/Icons/Icon'

const NewMessagesCTA: FC = () => {
  const { messages } = useChatContext()
  const [lastSeenMessage, setLastSeenMessage] = useState<ChatMessageType | null>(null)
  const [unseenMessages, setUnseenMessages] = useState<number>(0)
  const [firstLoad, setFirstLoad] = useState<boolean>(true)

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  useEffect(() => {
    const val: number =
      !lastSeenMessage || window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
        ? 0
        : messages.length - 1 - messages.findIndex((message) => message.id === lastSeenMessage.id)

    setUnseenMessages(val)
  }, [messages, lastSeenMessage])

  useEffect(() => {
    // if close to the bottom, scroll to the bottom
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      scrollToBottom()
    }
  }, [messages])

  useEffect(() => {
    // when the user scrolls to the bottom, set the last seen message to the last message
    const scrollHandler = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setLastSeenMessage(messages[messages.length - 1])
      }
    }
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [messages])

  //scroll to bottom on mount
  useEffect(() => {
    if (firstLoad && messages.length > 0) {
      window.scrollTo({ top: document.body.scrollHeight })
      return setFirstLoad(false)
    }
  }, [messages, firstLoad])

  if (unseenMessages < 1) return null

  return (
    <div className="w-full p-2 fixed bottom-32 flex flex-col items-center max-w-desktop">
      <button
        className="bg-gradient-to-r from-blue-400 to-orange-500 via-purple-500 animate-gradient-xy text-white rounded-full px-2"
        onClick={scrollToBottom}
      >
        {unseenMessages} new messages
      </button>
      <div className="animate-bounce">
        <Icon path="downArrow" size="md" />
      </div>
    </div>
  )
}

export default NewMessagesCTA
