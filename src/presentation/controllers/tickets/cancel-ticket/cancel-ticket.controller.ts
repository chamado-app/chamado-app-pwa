import { computed, inject, reactive } from 'vue'
import { useRoute } from 'vue-router'

import { type Notifier } from '@/data/protocols'
import { type CancelTicketUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'

import {
  type CancelTicketControllerProps,
  type CancelTicketController
} from './types'

export const useCancelTicketController = ({
  loadTicket
}: CancelTicketControllerProps): CancelTicketController => {
  const cancelTicketUsecase = inject<CancelTicketUsecase>(
    PROVIDERS.CANCEL_TICKET_USECASE
  )!
  const notifier = inject<Notifier>(PROVIDERS.NOTIFIER)!
  const route = useRoute()
  const state = reactive({ isLoading: false })
  const ticketId = computed(() => route.params.id as string)

  const onClean = (): void => {
    state.isLoading = false
  }

  const onCancelTicket = async (): Promise<void> => {
    if (state.isLoading) return

    state.isLoading = true

    try {
      await cancelTicketUsecase.execute(ticketId.value)
      notifier.success({ message: 'Chamado cancelado com sucesso' })
      void loadTicket(true)
      onClean()
    } catch (error: any) {
      notifier.error({ message: error.message })
    } finally {
      state.isLoading = false
    }
  }

  return { state, onCancelTicket }
}
