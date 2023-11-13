import { inject, onMounted } from 'vue'

import { type FetchEquipmentsUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'
import { useFetchEquipmentsStore } from '@/presentation/store'

import { type FetchEquipmentsController } from './types'

export const useFetchEquipmentsController = (): FetchEquipmentsController => {
  const store = useFetchEquipmentsStore()
  const fetchEquipmentsUsecase = inject<FetchEquipmentsUsecase>(
    PROVIDERS.FETCH_EQUIPMENTS_USECASE
  )!

  const fetchEquipments = async (): Promise<void> => {
    if (store.isLoading) return

    store.$patch({ isLoading: true })

    try {
      const equipments = await fetchEquipmentsUsecase.execute()
      store.$patch({ equipments })
    } catch (error) {
      store.$patch({ hasError: true })
    } finally {
      store.$patch({ isLoading: false })
    }
  }

  onMounted(fetchEquipments)

  return { store, fetchEquipments }
}
