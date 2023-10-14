export type TicketStatus = 'in-progress' | 'done'

export interface TicketEntity {
  id: string
  code: string
  title: string
  lastMessage: {
    content: string
    date: number
  }
  status: TicketStatus
  totalMessages: number
}