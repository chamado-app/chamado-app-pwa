import { computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { constants } from '@/constants'
import { type Notifier } from '@/data/protocols'
import { type ShowTicketUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'
import { useShowTicketStore } from '@/presentation/store'

import { type ShowTicketController } from './types'

export const useShowTicketController = (): ShowTicketController => {
  const store = useShowTicketStore()
  const route = useRoute()
  const router = useRouter()
  const ticketId = computed(() => route.params.id as string)
  const notifier = inject<Notifier>(PROVIDERS.NOTIFIER)!
  const showTicketUsecase = inject<ShowTicketUsecase>(
    PROVIDERS.SHOW_TICKET_USECASE
  )!

  const onClose = (): void => {
    void router.push({ name: constants.routes.tickets.list })
  }

  const loadTicket = async (): Promise<void> => {
    if (store.isLoading) return

    store.$patch({ isLoading: true })

    try {
      const data = await showTicketUsecase.execute(ticketId.value)
      store.$patch({ data })
    } catch (error: any) {
      notifier.error({ message: error.message })
    } finally {
      store.$patch({ isLoading: false })
    }
  }

  return { store, loadTicket, onClose }
}
