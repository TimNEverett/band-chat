// Make a chat input component
// This component will be used to send messages to the chat

import React, { useState } from 'react'
import { useChatContext } from '../../contexts/chat.context'
import Input from '../common/Input'
import Button from '../common/Button'
import { UpArrowIcon } from '../common/Icons.tsx/UpArrowIcon'

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
          className=" flex-1 rounded-l-lg rounded-r-none bg-gray-300 text-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" className="rounded-l-none">
          <UpArrowIcon />
        </Button>
      </form>
    </div>
  )
}
