<script lang="ts" setup>
import { constants } from '@/constants'
import {
  CopyIdAction,
  DesktopTableRow,
  MobileTableRow,
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
      <template #item="props">
        <MobileTableRow
          :columns="props.cols"
          :id="props.key"
          :route="constants.routes.categories.show">
          <template #list-item-value-id="{ value }">
            <CopyIdAction :value="value" />
          </template>
        </MobileTableRow>
      </template>
      <template #body="props">
        <DesktopTableRow
          :columns="props.cols"
          :id="props.key"
          :route="constants.routes.categories.show">
          <template #list-item-id="{ column }">
            <CopyIdAction :value="column.value" />
          </template>
        </DesktopTableRow>
      </template>
    </q-table>
  </TableWrapper>
</template>
