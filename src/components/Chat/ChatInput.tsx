// Make a chat input component
// This component will be used to send messages to the chat

import React, { useState, useRef } from 'react'
import { useChatContext } from '../../contexts/chat.context'
import Input from '../common/Input'
import SendIcon from '../common/Icons/SendIcon'

export const ChatInput = () => {
  const { sendMessage } = useChatContext()
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message && message.trim()) {
      await sendMessage(message)
      setMessage('')
      inputRef.current?.focus()
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full items-center">
      <Input
        className="h-10 flex-1 rounded-l-lg rounded-r-none border border-black border-r-0 bg-white"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        ref={inputRef}
      />
      <button
        type="submit"
        className={`rounded-r-lg text-white px-4 h-10 ${
          message.length > 0
            ? 'bg-gradient-to-r from-blue-400 to-orange-500 via-purple-500 animate-gradient-xy'
            : 'bg-black'
        }`}
      >
        <SendIcon />
      </button>
    </form>
  )
}
