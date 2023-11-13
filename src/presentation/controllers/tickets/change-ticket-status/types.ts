import { type TicketStatus } from '@/domain/entities'

import { type ShowTicketController } from '../show-ticket'

export type ChangeTicketStatusControllerProps = {
  loadTicket: ShowTicketController['loadTicket']
}

export interface ChangeTicketStatusController {
  onChangeTicketStatus: (status: TicketStatus) => Promise<void>
  state: { isLoading: boolean }
}
