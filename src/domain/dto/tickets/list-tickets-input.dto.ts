import { type TicketStatus } from '@/domain/entities'

export type ListTicketsInputDto = {
  status?: TicketStatus
}
