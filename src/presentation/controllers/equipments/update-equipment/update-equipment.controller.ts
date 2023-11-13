import { computed, inject, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { constants } from '@/constants'
import { type Notifier } from '@/data/protocols'
import {
  type ShowEquipmentUsecase,
  type UpdateEquipmentUsecase
} from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'
import { useShowEquipmentStore } from '@/presentation/store'

import {
  type UpdateEquipmentControllerProps,
  type UpdateEquipmentController
} from './types'

export const useUpdateEquipmentController = ({
  loadEquipments
}: UpdateEquipmentControllerProps): UpdateEquipmentController => {
  const updateEquipmentUsecase = inject<UpdateEquipmentUsecase>(
    PROVIDERS.UPDATE_EQUIPMENT_USECASE
  )!
  const showEquipmentUsecase = inject<ShowEquipmentUsecase>(
    PROVIDERS.SHOW_EQUIPMENT_USECASE
  )!
  const notifier = inject<Notifier>(PROVIDERS.NOTIFIER)!
  const router = useRouter()
  const route = useRoute()
  const store = useShowEquipmentStore()
  const equipmentId = computed<string>(() => route.params.id as string)

  const onClose = (): void => {
    void router.push({ name: constants.routes.equipments.list })
  }

  const loadEquipment = async (): Promise<void> => {
    if (!equipmentId.value) {
      void router.push({ name: constants.routes.equipments.list })
      return
    }

    try {
      const Equipment = await showEquipmentUsecase.execute(equipmentId.value)
      store.$patch({ form: { ...Equipment } })
    } catch (error: any) {
      notifier.error({ message: error.message })
      void router.push({ name: constants.routes.equipments.list })
    }
  }

  const onSubmit = async (): Promise<void> => {
    if (store.isSubmitting) return

    store.$patch({ isSubmitting: true })

    try {
      await updateEquipmentUsecase.execute(equipmentId.value, store.form)
      notifier.success({ message: 'Equipamento atualizado com sucesso' })
      void loadEquipments()
      onClose()
    } catch (error: any) {
      notifier.error({ message: error.message })
    } finally {
      store.$patch({ isSubmitting: false })
    }
  }

  onMounted(loadEquipment)

  return { store, onClose, onSubmit, equipmentId }
}
