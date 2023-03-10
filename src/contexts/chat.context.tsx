import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { Database } from '../types/DatabaseTypes'
import { ChatMessageType } from '../types/DBTypeAliases'
import { useBandContext } from './band.context'

interface ChatContext {
  messages: ChatMessageType[]
  sendMessage: (message: string) => Promise<void>
}

export const ChatContext = createContext<ChatContext>({
  messages: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  sendMessage: async () => {},
})

const messageSort = (a: ChatMessageType, b: ChatMessageType) =>
  new Date(a.created_at).getTime() - new Date(b.created_at).getTime()

export const ChatContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { band } = useBandContext()
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const supabase = useSupabaseClient<Database>()

  useEffect(() => {
    const chatMessageChannel = supabase
      .channel('public:chat_message')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_message' },
        (payload: { new: ChatMessageType }) => {
          setMessages((prev) => [...prev, payload.new].sort(messageSort))
        },
      )
      .subscribe()
    return () => {
      supabase.removeChannel(chatMessageChannel)
    }
  }, [band])

  useEffect(() => {
    const getMessages = async () => {
      if (band) {
        const { data: messages, error } = await supabase.from('chat_message').select('*').eq('band', band.id)
        if (error) throw error
        if (messages) setMessages(messages.sort(messageSort))
      }
    }
    getMessages()
  }, [band])

  const sendMessage = async (message: string) => {
    if (band) {
      const { error } = await supabase.from('chat_message').insert({ band: band.id, message })
      if (error) throw error
    }
  }

  return <ChatContext.Provider value={{ messages: messages, sendMessage }}>{children}</ChatContext.Provider>
}

export const useChatContext = () => useContext(ChatContext)
