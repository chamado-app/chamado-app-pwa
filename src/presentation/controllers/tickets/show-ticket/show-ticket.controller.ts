import { computed, inject, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { constants } from '@/constants'
import { type Notifier } from '@/data/protocols'
import { NotFoundException } from '@/domain/errors'
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

  const loadTicket = async (quiet: boolean = false): Promise<void> => {
    if (store.isLoading) return

    if (!quiet) store.$patch({ isLoading: true })

    try {
      const data = await showTicketUsecase.execute(ticketId.value)
      store.$patch({ data, isLoaded: true })
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        void router.push({ name: constants.routes.tickets.list, replace: true })
      }

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
