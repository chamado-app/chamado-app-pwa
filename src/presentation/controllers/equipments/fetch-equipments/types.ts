import { type useFetchEquipmentsStore } from '@/presentation/store'

export interface FetchEquipmentsController {
  store: ReturnType<typeof useFetchEquipmentsStore>
  fetchEquipments: () => Promise<void>
}
