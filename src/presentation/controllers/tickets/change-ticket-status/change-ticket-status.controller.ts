import { computed, inject, reactive } from 'vue'
import { useRoute } from 'vue-router'

import { type Notifier } from '@/data/protocols'
import { type TicketStatus } from '@/domain/entities'
import { type ChangeTicketStatusUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'

import {
  type ChangeTicketStatusControllerProps,
  type ChangeTicketStatusController
} from './types'

export const useChangeTicketStatusController = ({
  loadTicket
}: ChangeTicketStatusControllerProps): ChangeTicketStatusController => {
  const changeTicketStatusUsecase = inject<ChangeTicketStatusUsecase>(
    PROVIDERS.CHANGE_TICKET_STATUS_USECASE
  )!
  const notifier = inject<Notifier>(PROVIDERS.NOTIFIER)!
  const route = useRoute()
  const state = reactive({ isLoading: false })
  const ticketId = computed(() => route.params.id as string)

  const onClean = (): void => {
    state.isLoading = false
  }

  const onChangeTicketStatus = async (status: TicketStatus): Promise<void> => {
    if (state.isLoading) return

    state.isLoading = true

    try {
      await changeTicketStatusUsecase.execute(ticketId.value, status)
      await loadTicket(true)
      notifier.success({ message: 'Situação alterada com sucesso' })
      onClean()
    } catch (error: any) {
      notifier.error({ message: error.message })
    } finally {
      state.isLoading = false
    }
  }

  return { state, onChangeTicketStatus }
}
