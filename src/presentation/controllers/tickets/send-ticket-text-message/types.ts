import { type ShowTicketController } from '../show-ticket'

export type SendTicketTextMessageControllerProps = {
  loadTicket: ShowTicketController['loadTicket']
}

export interface SendTicketTextMessageController {
  onSent: () => Promise<void>
  state: { message: string; isSending: boolean }
}
