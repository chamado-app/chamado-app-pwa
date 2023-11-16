import { TicketStatus } from '@/domain/entities'

import { type TicketStatusMapped } from './types'

export const TICKET_STATUS_MAPPED: TicketStatusMapped[] = [
  { value: TicketStatus.NEW, label: 'Novo', color: 'primary' },
  {
    value: TicketStatus.AWAITING_RESPONSE,
    label: 'Aguardando resp.',
    color: 'warning'
  },
  {
    value: TicketStatus.IN_PROGRESS,
    label: 'Em andamento',
    color: 'secondary'
  },
  { value: TicketStatus.ANSWERED, label: 'Respondido', color: 'info' },
  { value: TicketStatus.CANCELLED, label: 'Cancelado', color: 'negative' },
  { value: TicketStatus.DONE, label: 'Concluído', color: 'positive' }
]
