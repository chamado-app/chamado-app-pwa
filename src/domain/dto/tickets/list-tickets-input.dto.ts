import { type ListInputDto } from '@/domain/base'
import { type TicketStatus } from '@/domain/entities'

export type ListTicketsInputDto = ListInputDto & {
  status?: TicketStatus
}
