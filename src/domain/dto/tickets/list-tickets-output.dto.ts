import { type ListOutputDto } from '@/domain/base'
import { type ListTicketItemEntity } from '@/domain/entities'

export type ListTicketsOutputDto = ListOutputDto & {
  tickets: ListTicketItemEntity[]
}
