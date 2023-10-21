<script lang="ts" setup>
import { computed, inject, onBeforeMount, onUnmounted, watch } from 'vue'

import { type ListCategoriesUsecase } from '@/domain/usecases'
import { PaginationFooter } from '@/presentation/components'
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
  <div class="list-wrapper">
    <q-card class="list-section">
      <q-card-section>
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
            <q-td class="table-actions">
              <q-btn
                color="secondary"
                rounded
                flat
                dense
                icon="mdi-pencil-outline">
                <q-tooltip anchor="top middle" self="bottom middle">
                  Editar
                </q-tooltip>
              </q-btn>
              <q-btn
                color="secondary"
                rounded
                flat
                dense
                icon="mdi-delete-outline">
                <q-tooltip anchor="top middle" self="bottom middle">
                  Deletar
                </q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
      <q-card-section class="flex justify-between">
        <PaginationFooter
          :pages="store.pagination.pages"
          :skip="store.skip"
          :total="store.total"
          v-model:page="store.pagination.page"
          v-model:take="store.take"
          @update:take="store.changeTake"
          @update:page="store.changePage" />
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="scss">
.list-wrapper {
  .list-section {
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.04);
  }
}

.table-actions {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.25rem;
  grid-auto-columns: max-content;
  grid-auto-rows: max-content;
  justify-content: center;
}
</style>
