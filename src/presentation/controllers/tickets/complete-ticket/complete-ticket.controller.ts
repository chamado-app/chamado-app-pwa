import { computed, inject, reactive } from 'vue'
import { useRoute } from 'vue-router'

import { type Notifier } from '@/data/protocols'
import { type CompleteTicketUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'

import {
  type CompleteTicketControllerProps,
  type CompleteTicketController
} from './types'

export const useCompleteTicketController = ({
  loadTicket
}: CompleteTicketControllerProps): CompleteTicketController => {
  const completeTicketUsecase = inject<CompleteTicketUsecase>(
    PROVIDERS.COMPLETE_TICKET_USECASE
  )!
  const notifier = inject<Notifier>(PROVIDERS.NOTIFIER)!
  const route = useRoute()
  const state = reactive({ isLoading: false })
  const ticketId = computed(() => route.params.id as string)

  const onClean = (): void => {
    state.isLoading = false
  }

  const onCompleteTicket = async (): Promise<void> => {
    if (state.isLoading) return

    state.isLoading = true

    try {
      await completeTicketUsecase.execute(ticketId.value)
      notifier.success({ message: 'Chamado encerrado com sucesso' })
      void loadTicket(true)
      onClean()
    } catch (error: any) {
      notifier.error({ message: error.message })
    } finally {
      state.isLoading = false
    }
  }

  return { state, onCompleteTicket }
}
