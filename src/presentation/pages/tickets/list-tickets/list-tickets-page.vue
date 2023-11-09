<script lang="ts" setup>
import { reactive } from 'vue'

import { constants } from '@/constants'
import { TableWrapper, TicketItem } from '@/presentation/components'
import { useTicketListController } from '@/presentation/controllers'

const { tickets } = useTicketListController()
const store = reactive({
  search: '',
  take: 10,
  skip: 10,
  total: 30,
  pagination: { page: 1, pages: 3 },
  isFirstLoading: false,
  noRegisters: false,
  noResults: false,
  changeTake() {
    //
  },
  changePage() {
    //
  },
  changeSearch() {
    //
  }
})
</script>

<template>
  <TableWrapper
    v-model:page="store.pagination.page"
    v-model:take="store.take"
    v-model:search="store.search"
    title="Chamados"
    :is-first-loading="store.isFirstLoading"
    :form-path="constants.routes.tickets.create"
    :no-registers="store.noRegisters"
    :no-results="store.noResults"
    :pages="store.pagination.pages"
    :skip="store.skip"
    :total="store.total"
    create-register-label="Abrir novo chamado"
    @update:take="store.changeTake"
    @update:page="store.changePage"
    @update:search="store.changeSearch">
    <q-list class="list-tickets__content">
      <TicketItem v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" />
    </q-list>
  </TableWrapper>
</template>

<style lang="scss" scoped>
.list-tickets {
  &__header {
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: 0.5rem;
  }

  &__content {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 0.75rem;
  }
}
</style>
