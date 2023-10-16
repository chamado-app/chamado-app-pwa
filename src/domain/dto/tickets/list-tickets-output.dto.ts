import { type TicketEntity } from '@/domain/entities'

export type ListTicketsOutputDto = {
  tickets?: TicketEntity[]
}
