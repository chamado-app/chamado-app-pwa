<script lang="ts" setup>
import { computed, inject, onBeforeMount, onUnmounted, watch } from 'vue'

import { type ListCategoriesUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'
import { useListCategoriesStore } from '@/presentation/store'

const store = useListCategoriesStore()
const listCategoriesUsecase = inject<ListCategoriesUsecase>(
  PROVIDERS.LIST_CATEGORIES_USECASE
)!

const loadCategories = async (): Promise<void> => {
  if (store.isLoading) return

  store.$patch({ isLoading: true })

  try {
    const { skip, take } = store
    const result = await listCategoriesUsecase.execute({ skip, take })
    const { categories: data, total } = result
    store.$patch({ data, total })
  } catch (error) {
    store.$patch({ hasError: true, total: 0 })
  } finally {
    store.$patch({ isLoading: false })
  }
}

const pagination = computed(() => ({
  page: store.skip === 0 ? 1 : store.skip / store.take + 1,
  rowsPerPage: store.take,
  total: Math.ceil(store.total / store.take)
}))

const tablePagination = computed(() => ({ ...pagination.value, page: 1 }))

const changePage = (page: number): void => {
  store.$patch({ skip: (page - 1) * store.take })
}

watch(() => pagination.value.page, loadCategories)

onBeforeMount(loadCategories)
onUnmounted(() => {
  store.$reset()
})
</script>

<template>
  <q-table
    flat
    hide-pagination
    :rows="store.data"
    :loading="store.isLoading"
    :pagination="tablePagination" />
  <q-pagination
    v-model="pagination.page"
    :max-pages="6"
    :max="pagination.total"
    @update:model-value="changePage"
    flat
    direction-links />
</template>
