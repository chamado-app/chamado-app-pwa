<script lang="ts" setup>
import { constants } from '@/constants'
import {
  CopyIdAction,
  MobileTableRow,
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
    v-model:search="store.search"
    @update:take="store.changeTake"
    @update:page="store.changePage">
    <q-table
      flat
      hide-pagination
      :dense="$q.screen.lt.md"
      :wrap-cells="$q.screen.lt.md"
      :grid="$q.screen.lt.md"
      binary-state-sort
      bordered
      row-key="id"
      :rows="store.data"
      :loading="store.isLoading"
      :pagination="pagination"
      :columns="listCategoriesColumns">
      <template v-slot:item="props">
        <MobileTableRow
          :columns="props.cols"
          :id="props.key"
          :route="constants.routes.categories.show" />
      </template>

      <template #body-cell-id="{ value }">
        <CopyIdAction :value="value" />
      </template>
      <template #body-cell-actions>
        <TableActions />
      </template>
    </q-table>
  </TableWrapper>
</template>
