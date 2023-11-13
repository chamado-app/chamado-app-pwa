import { type ListEquipmentsController } from '@/presentation/controllers'
import { type useShowEquipmentStore } from '@/presentation/store'

export type CreateEquipmentControllerProps = {
  loadEquipments: ListEquipmentsController['loadEquipments']
}

export interface CreateEquipmentController {
  onSubmit: () => Promise<void>
  onClose: () => void
  store: ReturnType<typeof useShowEquipmentStore>
}
