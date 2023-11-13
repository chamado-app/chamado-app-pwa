import { type TicketStatus } from './ticket.entity'

export interface ListTicketItemEntity {
  id: string
  title: string
  status: TicketStatus
  category: string
  totalMessages: number
  lastMessage: string
  lastMessageAt: Date
  reportedBy: string
  assignedTo: string
  createdAt: Date
  updatedAt: Date
}
