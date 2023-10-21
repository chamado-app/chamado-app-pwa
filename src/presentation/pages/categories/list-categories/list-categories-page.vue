<script lang="ts" setup>
import {
  CopyIdAction,
  TableActions,
  TableWrapper
} from '@/presentation/components'
import { useListCategoriesController } from '@/presentation/controllers'

import { listCategoriesColumns } from './list-categories-columns'

const { pagination, store } = useListCategoriesController()
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
      <template #body-cell-id="{ value }">
        <CopyIdAction :value="value" />
      </template>
      <template #body-cell-actions>
        <TableActions />
      </template>
    </q-table>
  </TableWrapper>
</template>
