import { type TicketStatus } from '@/domain/entities'

export type TicketStatusMapped = {
  label: string
  color: string
  value: TicketStatus
}
