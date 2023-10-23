<script lang="ts" setup>
import { constants } from '@/constants'
import {
  CopyIdAction,
  DesktopTableRow,
  MobileTableRow,
  TableWrapper
} from '@/presentation/components'
import {
  useDeleteCategoryController,
  useListCategoriesController
} from '@/presentation/controllers'
import { useDefaultTableProps, useTableColumns } from '@/presentation/utils'

import {
  desktopTableColumns,
  mobileTableColumns
} from './list-categories-columns'

const columns = useTableColumns(desktopTableColumns, mobileTableColumns)
const defaultTableProps = useDefaultTableProps()
const { pagination, store, loadCategories } = useListCategoriesController()
const { deleteHandler } = useDeleteCategoryController({ loadCategories })
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
    @update:page="store.changePage"
    @update:search="store.changeSearch">
    <q-table
      v-bind="defaultTableProps"
      :rows="store.data"
      :loading="store.isLoading"
      :pagination="pagination"
      :columns="columns">
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
          :route="constants.routes.categories.show"
          :delete-handler="() => deleteHandler(props.key)">
          <template #list-item-id="{ column }">
            <CopyIdAction :value="column.value" />
          </template>
        </DesktopTableRow>
      </template>
    </q-table>
  </TableWrapper>
</template>
