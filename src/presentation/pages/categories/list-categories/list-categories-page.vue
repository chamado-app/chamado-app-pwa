<script lang="ts" setup>
import { onUnmounted } from 'vue'

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

onUnmounted(() => {
  store.$reset()
})
</script>

<template>
  <TableWrapper
    v-model:page="store.pagination.page"
    v-model:take="store.take"
    v-model:search="store.search"
    title="Áreas"
    :is-first-loading="store.isFirstLoading"
    :form-path="constants.routes.categories.create"
    :no-registers="store.noRegisters"
    :no-results="store.noResults"
    :pages="store.pagination.pages"
    :skip="store.skip"
    :total="store.total"
    create-register-label="Cadastrar nova área"
    @update:take="store.changeTake"
    @update:page="store.changePage"
    @update:search="store.changeSearch">
    <q-table
      v-bind="defaultTableProps"
      :rows="store.data"
      :pagination="pagination"
      :loading="store.isLoading"
      :columns="columns">
      <template #item="props">
        <MobileTableRow
          :id="props.key"
          :columns="props.cols"
          :route="constants.routes.categories.show">
          <template #list-item-value-id="{ value }">
            <CopyIdAction :value="value" />
          </template>
        </MobileTableRow>
      </template>
      <template #body="props">
        <DesktopTableRow
          :id="props.key"
          :columns="props.cols"
          :route="constants.routes.categories.show"
          :delete-handler="() => deleteHandler(props.key)">
          <template #list-item-id="{ column }">
            <CopyIdAction :value="column.value" />
          </template>
        </DesktopTableRow>
      </template>
    </q-table>
  </TableWrapper>
  <router-view />
</template>
