import { type ShowTicketController } from '../show-ticket'

export type CompleteTicketControllerProps = {
  loadTicket: ShowTicketController['loadTicket']
}

export interface CompleteTicketController {
  onCompleteTicket: () => Promise<void>
  state: { isLoading: boolean }
}
