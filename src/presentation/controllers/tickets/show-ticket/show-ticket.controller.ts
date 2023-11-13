import { computed, inject, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

import { type Notifier } from '@/data/protocols'
import { type ShowTicketUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'
import { useShowTicketStore } from '@/presentation/store'

import { type ShowTicketController } from './types'

export const useShowTicketController = (): ShowTicketController => {
  const store = useShowTicketStore()
  const route = useRoute()
  const ticketId = computed(() => route.params.id as string)
  const notifier = inject<Notifier>(PROVIDERS.NOTIFIER)!
  const showTicketUsecase = inject<ShowTicketUsecase>(
    PROVIDERS.SHOW_TICKET_USECASE
  )!

  const loadTicket = async (): Promise<void> => {
    if (store.isLoading) return

    store.$patch({ isLoading: true })

    try {
      const data = await showTicketUsecase.execute(ticketId.value)
      store.$patch({ data, isLoaded: true })
    } catch (error: any) {
      notifier.error({ message: error.message })
      store.$patch({ isLoaded: false })
    } finally {
      store.$patch({ isLoading: false })
    }
  }

  onUnmounted(() => {
    store.$reset()
  })

  return { store, loadTicket, ticketId }
}
