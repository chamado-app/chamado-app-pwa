import { computed, inject, reactive } from 'vue'
import { useRoute } from 'vue-router'

import { type Notifier } from '@/data/protocols'
import { type ChangeTicketAssignedUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'

import {
  type ChangeTicketAssignedControllerProps,
  type ChangeTicketAssignedController
} from './types'

export const useChangeTicketAssignedController = ({
  loadTicket
}: ChangeTicketAssignedControllerProps): ChangeTicketAssignedController => {
  const changeTicketAssignedUsecase = inject<ChangeTicketAssignedUsecase>(
    PROVIDERS.CHANGE_TICKET_ASSIGNED_USECASE
  )!
  const notifier = inject<Notifier>(PROVIDERS.NOTIFIER)!
  const route = useRoute()
  const state = reactive({ isLoading: false })
  const ticketId = computed(() => route.params.id as string)

  const onClean = (): void => {
    state.isLoading = false
  }

  const onChangeTicketAssigned = async (
    assignedToId: string
  ): Promise<void> => {
    if (state.isLoading) return

    state.isLoading = true

    try {
      await changeTicketAssignedUsecase.execute(ticketId.value, assignedToId)
      await loadTicket(true)
      notifier.success({ message: 'Responsável alterado com sucesso' })
      onClean()
    } catch (error: any) {
      notifier.error({ message: error.message })
    } finally {
      state.isLoading = false
    }
  }

  return { state, onChangeTicketAssigned }
}
