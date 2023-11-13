export type SendTicketTextMessageControllerProps = {
  loadTicket: () => Promise<void>
}

export interface SendTicketTextMessageController {
  onSent: () => Promise<void>
  state: { message: string; isSending: boolean }
}
