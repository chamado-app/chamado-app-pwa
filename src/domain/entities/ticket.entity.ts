export type TicketStatus = 'in-progress' | 'done'

export interface TicketEntity {
  id: number
  code: string
  title: string
  lastMessage: {
    content: string
    date: number
  }
  status: TicketStatus
  totalMessages: number
}
