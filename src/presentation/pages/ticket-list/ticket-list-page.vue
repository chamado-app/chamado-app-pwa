<script lang="ts" setup>
import { CreateFloatButton, TicketItem } from '@/presentation/components'
import { useTicketListController } from '@/presentation/controllers'

const { title, tickets } = useTicketListController()
</script>

<template>
  <h2 class="text-h6 q-mb-md">{{ title }}</h2>
  <div class="ticket-list__wrapper">
    <q-list class="ticket-list__content">
      <TicketItem v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" />
    </q-list>
  </div>
  <CreateFloatButton />
</template>

<style lang="scss" scoped>
.ticket-list {
  &__content {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 0.75rem;
  }
}
</style>
