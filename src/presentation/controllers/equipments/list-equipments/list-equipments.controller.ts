import { computed, inject, watch } from 'vue'

import { type ListEquipmentsUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'
import { useListEquipmentsStore } from '@/presentation/store'
import { useScrollToTop } from '@/presentation/utils'

import { type ListEquipmentsController } from './types'

export const useListEquipmentsController = (): ListEquipmentsController => {
  const store = useListEquipmentsStore()
  const listEquipmentsUsecase = inject<ListEquipmentsUsecase>(
    PROVIDERS.LIST_EQUIPMENTS_USECASE
  )!

  const loadEquipments = async (): Promise<void> => {
    if (store.isLoading) return

    store.$patch({ isLoading: true })

    try {
      const { skip, take, search } = store
      const result = await listEquipmentsUsecase.execute({ skip, take, search })
      const { equipments: data, total } = result
      store.$patch({ data, total, isLoaded: true })
    } catch (error) {
      store.$patch({ hasError: true, total: 0 })
    } finally {
      store.$patch({ isLoading: false })
    }
  }

  const pagination = computed(() => ({
    ...store.pagination,
    page: 1,
    rowsPerPage: store.take,
    rowsNumber: store.total
  }))

  watch(() => store.skip, loadEquipments)
  watch(() => store.take, loadEquipments)
  watch(() => store.isLoading, useScrollToTop())
  watch(
    () => store.search,
    (value) => {
      if (value && value.length < 3) return
      void loadEquipments()
    }
  )

  return { pagination, store, loadEquipments }
}
