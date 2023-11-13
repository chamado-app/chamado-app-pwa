import { inject } from 'vue'
import { useRouter } from 'vue-router'

import { constants } from '@/constants'
import { type Notifier } from '@/data/protocols'
import { type CreateEquipmentUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'
import { useShowEquipmentStore } from '@/presentation/store'

import {
  type CreateEquipmentControllerProps,
  type CreateEquipmentController
} from './types'

export const useCreateEquipmentController = ({
  loadEquipments
}: CreateEquipmentControllerProps): CreateEquipmentController => {
  const createEquipmentUsecase = inject<CreateEquipmentUsecase>(
    PROVIDERS.CREATE_EQUIPMENT_USECASE
  )!
  const notifier = inject<Notifier>(PROVIDERS.NOTIFIER)!
  const router = useRouter()
  const store = useShowEquipmentStore()

  const onClose = (): void => {
    void router.push({ name: constants.routes.equipments.list })
  }

  const onSubmit = async (): Promise<void> => {
    if (store.isSubmitting) return

    store.$patch({ isSubmitting: true })

    try {
      await createEquipmentUsecase.execute(store.form)
      notifier.success({ message: 'Equipamento criado com sucesso' })
      void loadEquipments()
      onClose()
    } catch (error: any) {
      notifier.error({ message: error.message })
    } finally {
      store.$patch({ isSubmitting: false })
    }
  }

  return { store, onClose, onSubmit }
}
