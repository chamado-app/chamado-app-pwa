import { inject } from 'vue'
import { useRouter } from 'vue-router'

import { constants } from '@/constants'
import { type Notifier } from '@/data/protocols'
import { type CreateTicketUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'
import { useCreateTicketStore } from '@/presentation/store'

import {
  type CreateTicketControllerProps,
  type CreateTicketController
} from './types'

export const useCreateTicketController = ({
  loadTickets
}: CreateTicketControllerProps): CreateTicketController => {
  const createTicketUsecase = inject<CreateTicketUsecase>(
    PROVIDERS.CREATE_TICKET_USECASE
  )!
  const notifier = inject<Notifier>(PROVIDERS.NOTIFIER)!
  const router = useRouter()
  const store = useCreateTicketStore()

  const onClose = (): void => {
    void router.push({ name: constants.routes.tickets.list })
  }

  const onSubmit = async (): Promise<void> => {
    if (store.isSubmitting) return

    store.$patch({ isSubmitting: true })

    try {
      await createTicketUsecase.execute(store.form)
      notifier.success({ message: 'Chamado aberto com sucesso' })
      void loadTickets()
      onClose()
    } catch (error: any) {
      notifier.error({ message: error.message })
    } finally {
      store.$patch({ isSubmitting: false })
    }
  }

  return { store, onClose, onSubmit }
}
