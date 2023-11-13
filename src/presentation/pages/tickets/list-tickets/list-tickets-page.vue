<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'

import { constants } from '@/constants'
import { TableWrapper, TicketItem } from '@/presentation/components'
import { useListTicketsController } from '@/presentation/controllers'

const { store, loadTickets } = useListTicketsController()

onUnmounted(() => {
  store.$reset()
})

onMounted(loadTickets)
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
    no-registers-title="Nenhum chamado encontrado"
    no-registers-message="Caso necessário, abra um novo chamado"
    no-registers-button-label="Abrir novo chamado"
    @update:take="store.changeTake"
    @update:page="store.changePage"
    @update:search="store.changeSearch">
    <q-list class="list-tickets__content">
      <TicketItem
        v-for="ticket in store.data"
        :key="ticket.id"
        :ticket="ticket" />
    </q-list>
  </TableWrapper>
  <router-view />
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
