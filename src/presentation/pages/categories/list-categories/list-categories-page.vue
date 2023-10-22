<script lang="ts" setup>
import { constants } from '@/constants'
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
        <div class="grid-list__wrapper col-xs-12 col-sm-6">
          <router-link
            class="text-body text-decorator-none"
            :to="{
              name: constants.routes.categories.show,
              params: { id: props.key }
            }">
            <q-card bordered flat class="grid-list__item">
              <q-list dense class="grid-list__content">
                <template v-for="col in props.cols" :key="col.name">
                  <q-item class="grid-list__list-item">
                    <q-item-section>
                      <q-item-label class="text-weight-bold">
                        {{ col.label }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label v-if="col.name !== 'id'" caption>
                        {{ col.value }}
                      </q-item-label>
                      <CopyIdAction v-else :value="col.value" />
                    </q-item-section>
                  </q-item>
                </template>
              </q-list>
            </q-card>
          </router-link>
        </div>
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

<style lang="scss">
.grid-list {
  &__wrapper {
    padding: 0.25rem;
  }

  &__item {
    padding: 0.25rem 0.75rem;
  }

  &__content,
  &__list-item {
    padding: 0 !important;
  }
}
</style>
