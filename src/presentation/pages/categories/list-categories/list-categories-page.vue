<script lang="ts" setup>
import { type QTableProps } from 'quasar'
import { computed, inject, onBeforeMount, onUnmounted, watch } from 'vue'

import { type ListCategoriesUsecase } from '@/domain/usecases'
import { PaginationInfo, RowsPerPage } from '@/presentation/components'
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

const tablePagination = computed(() => ({
  ...pagination.value,
  page: 1,
  rowsNumber: store.total
}))

const changePage = (page: number): void => {
  store.$patch({ skip: (page - 1) * store.take })
}

watch(() => store.skip, loadCategories)
watch(() => store.take, loadCategories)

onBeforeMount(loadCategories)
onUnmounted(() => {
  store.$reset()
})

const columns: QTableProps['columns'] = [
  { name: 'name', field: 'name', label: 'Nome', align: 'left' },
  {
    name: 'description',
    field: 'description',
    label: 'Descrição',
    align: 'left',
    format: (value: string) => value || '-'
  },
  {
    name: 'createdAt',
    field: 'createdAt',
    label: 'Criado em',
    align: 'left',
    format: (value: Date) => {
      return value.toLocaleString(undefined, {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  },
  {
    name: 'updatedAt',
    field: 'updatedAt',
    label: 'Atualizado em',
    align: 'left',
    format: (value: Date) => {
      return value.toLocaleString(undefined, {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  },
  {
    name: 'actions',
    field: 'id',
    label: 'Ações',
    align: 'center'
  }
]
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
          :pagination="tablePagination"
          :columns="columns">
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
        <RowsPerPage v-model="store.take" />
        <div class="page-information">
          <PaginationInfo
            :total="store.total"
            :skip="store.skip"
            :take="store.take" />
          <q-pagination
            v-model="pagination.page"
            :max-pages="6"
            :max="pagination.total"
            @update:model-value="changePage"
            flat
            direction-links
            color="secondary" />
        </div>
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

.page-information {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.5rem;
  grid-auto-columns: max-content;
  grid-auto-rows: max-content;
  justify-content: center;
  align-items: center;
}
</style>
