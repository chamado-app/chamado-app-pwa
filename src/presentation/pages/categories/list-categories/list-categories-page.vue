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
</script>

<template>
  <div class="list-wrapper">
    <q-card class="list-section">
      <q-card-section>
        <q-table
          flat
          hide-pagination
          :rows="store.data"
          :loading="store.isLoading"
          :pagination="tablePagination" />
      </q-card-section>
      <q-card-section class="flex justify-between">
        <q-select
          v-model="store.take"
          :options="[5, 10, 20]"
          outlined
          dense
          color="secondary" />
        <q-pagination
          v-model="pagination.page"
          :max-pages="6"
          :max="pagination.total"
          @update:model-value="changePage"
          flat
          direction-links
          color="secondary" />
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
</style>
