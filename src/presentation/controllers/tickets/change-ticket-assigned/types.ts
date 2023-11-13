import { type ShowTicketController } from '../show-ticket'

export type ChangeTicketAssignedControllerProps = {
  loadTicket: ShowTicketController['loadTicket']
}

export interface ChangeTicketAssignedController {
  onChangeTicketAssigned: (assignedToId: string) => Promise<void>
  state: { isLoading: boolean }
}
