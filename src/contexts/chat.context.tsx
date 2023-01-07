import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { Database } from '../types/DatabaseTypes'
import { ChatMessageType } from '../types/DBTypeAliases'
import { useBandContext } from './band.context'

interface ChatContext {
  messages: ChatMessageType[]
}

export const ChatContext = createContext<ChatContext>({
  messages: [],
})

export const ChatContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { band } = useBandContext()
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const supabase = useSupabaseClient<Database>()

  useEffect(() => {
    const getMessages = async () => {
      if (band) {
        const { data: messages, error } = await supabase.from('chat_message').select('*').eq('band', band.id)
        if (error) throw error
        if (messages) setMessages(messages)
      }
    }
    getMessages()
  }, [band])

  return <ChatContext.Provider value={{ messages }}>{children}</ChatContext.Provider>
}

export const useChatContext = () => useContext(ChatContext)
