<script lang="ts" setup>
import { computed, inject, onBeforeMount, onUnmounted, watch } from 'vue'

import { type ListCategoriesUsecase } from '@/domain/usecases'
import { TableActions, TableWrapper } from '@/presentation/components'
import { PROVIDERS } from '@/presentation/providers'
import { useListCategoriesStore } from '@/presentation/store'

import { listCategoriesColumns } from './list-categories-columns'

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
  ...store.pagination,
  page: 1,
  rowsPerPage: store.take,
  rowsNumber: store.total
}))

watch(() => store.skip, loadCategories)
watch(() => store.take, loadCategories)

onBeforeMount(loadCategories)
onUnmounted(() => {
  store.$reset()
})
</script>

<template>
  <TableWrapper
    :pages="store.pagination.pages"
    :skip="store.skip"
    :total="store.total"
    v-model:page="store.pagination.page"
    v-model:take="store.take"
    @update:take="store.changeTake"
    @update:page="store.changePage">
    <q-table
      flat
      hide-pagination
      binary-state-sort
      row-key="id"
      :rows="store.data"
      :loading="store.isLoading"
      :pagination="pagination"
      :columns="listCategoriesColumns">
      <template #body-cell-actions>
        <TableActions />
      </template>
    </q-table>
  </TableWrapper>
</template>
