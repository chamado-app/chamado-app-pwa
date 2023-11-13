import { type ListEquipmentsController } from '@/presentation/controllers'

export type DeleteEquipmentControllerProps = {
  loadEquipments: ListEquipmentsController['loadEquipments']
}

export interface DeleteEquipmentController {
  deleteHandler: (id: string) => Promise<void>
}
