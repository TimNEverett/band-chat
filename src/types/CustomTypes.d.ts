import { ChatMessageType } from './DBTypeAliases'

export type ChatMessageGroupType = {
  sender: string
  date: string
  messages: ChatMessageType[]
}
