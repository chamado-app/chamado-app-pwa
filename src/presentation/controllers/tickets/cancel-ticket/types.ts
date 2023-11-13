import { type ShowTicketController } from '../show-ticket'

export type CancelTicketControllerProps = {
  loadTicket: ShowTicketController['loadTicket']
}

export interface CancelTicketController {
  onCancelTicket: () => Promise<void>
  state: { isLoading: boolean }
}
