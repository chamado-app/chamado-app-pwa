<script lang="ts" setup>
import { DateTime } from 'luxon'
import { computed } from 'vue'

import { constants } from '@/constants'
import { type TicketEntity } from '@/domain/entities'

import { CopyIdAction } from '../../ui'

const props = defineProps<{
  ticket: TicketEntity
}>()

const status = computed(() => {
  const statuses: Record<string, any> = {
    'in-progress': { color: 'secondary', text: 'white', label: 'Em progresso' },
    done: { color: 'positive', text: 'white', label: 'Concluído' }
  }

  return statuses[props.ticket.status]
})

const ticketCardClasses = computed(() => [
  'ticket-item__wrapper',
  `ticket-item__wrapper-${status.value.color}`
])
</script>

<template>
  <q-item
    :to="{
      name: constants.routes.tickets.show,
      params: { id: props.ticket.id }
    }"
    :class="ticketCardClasses">
    <q-item-section class="ticket-item__content" top>
      <div class="ticket-item__indentification">
        <div
          class="ticket-item__code text-subtitle2 text-weight-bold text-uppercase">
          <CopyIdAction :value="props.ticket.id" />
        </div>
        <q-chip
          class="ticket-item__status"
          :ripple="false"
          :color="status.color"
          :text-color="status.text">
          {{ status.label }}
        </q-chip>
      </div>
      <div class="ticket-item__sumary">
        <div class="ticket-item__sumary-section">
          <h3 class="ticket-item__title text-subtitle1 text-weight-bold">
            {{ props.ticket.title }}
          </h3>
          <span class="text-caption text-subtitle1">
            ({{ props.ticket.totalMessages }})
          </span>
          <span class="text-caption text-subtitle2">
            {{
              DateTime.fromMillis(
                props.ticket.lastMessage!.sentAt.getTime()
              ).toRelative({
                style: 'long',
                round: true
              })
            }}
          </span>
        </div>
        <div class="ticket-item__sumary-section">
          <h4 class="ticket-item__subtitle text-subtitle2">
            {{ props.ticket.lastMessage?.message.text }}
          </h4>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<style lang="scss" scoped>
.ticket-item {
  &__wrapper {
    border-radius: 0.25rem;
    border-width: 1px;
    border-style: solid;
    padding: 0;

    &-positive {
      border-color: $positive;
    }

    &-primary {
      border-color: $primary;
    }

    &-secondary {
      border-color: $secondary;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 7.5rem auto;
    grid-gap: 1.5rem;
    padding: 1rem 1rem 1rem 0rem;
  }

  &__indentification,
  &__sumary {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: flex-start;
  }

  &__code,
  &__status {
    padding-left: 1rem;
  }

  &__sumary {
    gap: 0.25rem;

    &-section {
      display: flex;
      gap: 0.25rem;
      align-items: center;
    }
  }

  &__code {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  &__status {
    border-radius: 0 1rem 1rem 0;
    margin: 0;
  }
}
</style>
