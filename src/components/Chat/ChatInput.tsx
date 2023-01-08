// Make a chat input component
// This component will be used to send messages to the chat

import React, { useState } from 'react'
import { useChatContext } from '../../contexts/chat.context'
import Input from '../common/Input'
import SendIcon from '../common/Icons.tsx/SendIcon'

export const ChatInput = () => {
  const { sendMessage } = useChatContext()
  const [message, setMessage] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message && message.trim()) {
      await sendMessage(message)
      setMessage('')
    }
  }

  return (
    <div className="flex w-full">
      <form onSubmit={onSubmit} className="flex w-full">
        <Input
          className=" flex-1 rounded-l-lg rounded-r-none border border-black bg-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="rounded-r-lg bg-black text-white px-4">
          <SendIcon />
        </button>
      </form>
    </div>
  )
}
