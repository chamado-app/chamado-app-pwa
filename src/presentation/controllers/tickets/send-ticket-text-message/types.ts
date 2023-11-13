export type SendTicketTextMessageControllerProps = {
  showTicket: () => Promise<void>
}

export interface SendTicketTextMessageController {
  onSent: () => Promise<void>
  state: { message: string; isSending: boolean }
}
