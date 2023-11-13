import { type TicketEntity, type ListTicketItemEntity } from '@/domain/entities'

export type RemoteTicketEntity = Omit<
  TicketEntity,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string
  updatedAt: string
}

export type RemoteListTicketItemEntity = Omit<
  ListTicketItemEntity,
  'createdAt' | 'updatedAt' | 'lastMessageAt'
> & {
  lastMessageAt: string
  createdAt: string
  updatedAt: string
}
