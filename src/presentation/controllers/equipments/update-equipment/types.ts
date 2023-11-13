import { type ComputedRef } from 'vue'

import { type ListEquipmentsController } from '@/presentation/controllers'
import { type useShowEquipmentStore } from '@/presentation/store'

export type UpdateEquipmentControllerProps = {
  loadEquipments: ListEquipmentsController['loadEquipments']
}

export interface UpdateEquipmentController {
  onSubmit: () => Promise<void>
  onClose: () => void
  store: ReturnType<typeof useShowEquipmentStore>
  equipmentId: ComputedRef<string>
}
