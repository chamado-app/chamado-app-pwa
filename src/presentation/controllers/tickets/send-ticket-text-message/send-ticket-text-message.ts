import { computed, inject, reactive } from 'vue'
import { useRoute } from 'vue-router'

import { type Notifier } from '@/data/protocols'
import { type SendTicketTextMessageUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'

import {
  type SendTicketTextMessageControllerProps,
  type SendTicketTextMessageController
} from './types'

export const useSendTicketTextMessageControllerController = ({
  loadTicket
}: SendTicketTextMessageControllerProps): SendTicketTextMessageController => {
  const createTicketUsecase = inject<SendTicketTextMessageUsecase>(
    PROVIDERS.SEND_TICKET_TEXT_MESSAGE_USECASE
  )!
  const notifier = inject<Notifier>(PROVIDERS.NOTIFIER)!
  const route = useRoute()
  const state = reactive({ message: '', isSending: false })
  const ticketId = computed(() => route.params.id as string)

  const onClean = (): void => {
    state.message = ''
    state.isSending = false
  }

  const onSent = async (): Promise<void> => {
    if (state.isSending) return

    state.isSending = true

    try {
      const payload = { text: state.message }
      await createTicketUsecase.execute(ticketId.value, payload)
      void loadTicket()
      onClean()
    } catch (error: any) {
      notifier.error({ message: error.message })
    } finally {
      state.isSending = false
    }
  }

  return { state, onSent }
}
