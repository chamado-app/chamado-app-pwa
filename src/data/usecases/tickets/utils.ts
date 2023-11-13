import { type ListTicketItemEntity, type TicketEntity } from '@/domain/entities'

import {
  type RemoteListTicketItemEntity,
  type RemoteTicketEntity
} from './types'

export const parseRemoteTicketEntityToTicketEntity = ({
  createdAt,
  updatedAt,
  messages,
  ...ticket
}: RemoteTicketEntity): TicketEntity => ({
  ...ticket,
  messages: messages.map((message) => ({
    ...message,
    sentAt: new Date(message.sentAt),
    readAt: message.readAt ? new Date(message.readAt) : undefined
  })),
  createdAt: new Date(createdAt),
  updatedAt: new Date(updatedAt)
})

export const parseRemoteListTicketItemEntitytoListTicketItemEntity = ({
  createdAt,
  updatedAt,
  lastMessageAt,
  ...ticket
}: RemoteListTicketItemEntity): ListTicketItemEntity => ({
  ...ticket,
  createdAt: new Date(createdAt),
  updatedAt: new Date(updatedAt),
  lastMessageAt: new Date(lastMessageAt)
})
