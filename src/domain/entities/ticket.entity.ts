import { type UserEntity } from './user.entity'

export enum TicketStatus {
  IN_PROGRESS = 'in-progress',
  DONE = 'done'
}

export enum TicketMessageType {
  TEXT = 'text',
  IMAGE = 'image',
  SYSTEM = 'system'
}

export type MessageContent = {
  text: string
  url?: string
  type: TicketMessageType
}

export type TicketMessageOwner = {
  id: UserEntity['id']
  name: UserEntity['firstName'] & UserEntity['lastName']
  avatar: string
}

export interface TicketMessageEntity {
  id: string
  message: MessageContent
  sentAt: Date
  owner?: TicketMessageOwner
  readAt?: Date
  ticketId: string
}

export interface TicketEntity {
  id: string
  title: string
  messages: TicketMessageEntity[]
  status: TicketStatus
  totalMessages: number
  lastMessage?: TicketMessageEntity
  createdAt: Date
  updatedAt: Date
}
