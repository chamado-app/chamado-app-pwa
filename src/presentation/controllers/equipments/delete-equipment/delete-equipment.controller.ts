import { inject } from 'vue'

import { type Notifier } from '@/data/protocols'
import { type DeleteEquipmentUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'

import {
  type DeleteEquipmentController,
  type DeleteEquipmentControllerProps
} from './types'

export const useDeleteEquipmentController = (
  props: DeleteEquipmentControllerProps
): DeleteEquipmentController => {
  const deleteEquipmentUsecase = inject<DeleteEquipmentUsecase>(
    PROVIDERS.DELETE_EQUIPMENT_USECASE
  )!

  const notifier = inject<Notifier>(PROVIDERS.NOTIFIER)!

  const deleteHandler = async (id: string): Promise<void> => {
    try {
      await deleteEquipmentUsecase.execute(id)
      notifier.success({ message: 'Equipamento excluído com sucesso.' })
      void props.loadEquipments()
    } catch (error: any) {
      notifier.error({ message: error.message })
    }
  }

  return { deleteHandler }
}
