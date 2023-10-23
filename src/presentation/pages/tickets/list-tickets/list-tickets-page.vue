<script lang="ts" setup>
import { TicketItem } from '@/presentation/components'
import { useTicketListController } from '@/presentation/controllers'

const { tickets } = useTicketListController()
</script>

<template>
  <div class="list-tickets__wrapper">
    <q-list class="list-tickets__content">
      <TicketItem v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" />
    </q-list>
  </div>
</template>

<style lang="scss" scoped>
.list-tickets {
  &__content {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 0.75rem;
  }
}
</style>
