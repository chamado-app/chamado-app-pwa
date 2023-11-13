import { type TicketEntity } from './ticket.entity'
import { type UserEntity } from './user.entity'

export enum TicketMessageType {
  TEXT = 'text',
  IMAGE = 'image',
  SYSTEM = 'system'
}

export interface TicketTextMessageFormEntity {
  text: string
}

export interface TicketMessageEntity {
  text: string
  url?: string
  type: TicketMessageType
  ticket: TicketEntity
  sentBy: UserEntity
  sentAt: Date
  readAt?: Date
}
