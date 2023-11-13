import { type ListTicketsOutputDto } from '@/domain/dto'

import { type RemoteListTicketItemEntity } from '../types'

export type RemoteListTicketDto = Omit<ListTicketsOutputDto, 'tickets'> & {
  tickets: RemoteListTicketItemEntity[]
}
