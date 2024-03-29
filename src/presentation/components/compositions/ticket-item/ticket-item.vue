<script lang="ts" setup>
import { DateTime } from 'luxon'
import { computed } from 'vue'

import { constants } from '@/constants'
import { type ListTicketItemEntity } from '@/domain/entities'

import { TICKET_STATUS_MAPPED } from '../../statefull/ticket/status-mapped'
import { CopyIdAction } from '../../ui'

const props = defineProps<{
  ticket: ListTicketItemEntity
}>()

const status = computed(() => {
  const status = TICKET_STATUS_MAPPED.find(
    (item) => item.value === props.ticket.status
  )
  return status!
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
    <q-item-section top class="ticket-item__content">
      <div class="ticket-item__indentification">
        <div
          class="ticket-item__code text-subtitle2 text-weight-bold text-uppercase">
          <CopyIdAction :value="props.ticket.id" />
        </div>
        <q-chip
          class="ticket-item__status"
          :ripple="false"
          :color="status.color"
          text-color="white">
          {{ status.label }}
        </q-chip>
      </div>
      <div class="ticket-item__sumary">
        <div class="ticket-item__sumary-section">
          <h3 class="ticket-item__title text-subtitle1 text-weight-bold">
            {{ props.ticket.title }}
            <span class="text-caption text-subtitle1">
              ({{ props.ticket.totalMessages }})
            </span>
          </h3>
          <span class="text-caption text-subtitle2">
            {{
              DateTime.fromMillis(
                props.ticket.lastMessageAt.getTime()
              ).toRelative({
                style: 'long',
                round: true
              })
            }}
          </span>
        </div>
        <div class="ticket-item__sumary-section">
          <h4 class="ticket-item__subtitle text-subtitle2">
            {{ props.ticket.lastMessage }}
          </h4>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<style lang="scss" scoped>
.ticket-item {
  &__title {
    line-height: normal;

    @media screen and (max-width: $breakpoint-sm-max) {
      font-weight: 1rem;
    }
  }

  &__wrapper {
    border-radius: 0.25rem;
    border-width: 1px;
    border-style: solid;
    padding: 0;

    &-primary {
      border-color: $primary;
    }

    &-secondary {
      border-color: $secondary;
    }

    &-info {
      border-color: $info;
    }

    &-positive {
      border-color: $positive;
    }

    &-warning {
      border-color: $warning;
    }

    &-negative {
      border-color: $negative;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 8rem auto;
    grid-gap: 1rem;
    padding: 0.75rem 1rem 0.75rem 0rem;

    @media screen and (max-width: $breakpoint-sm-max) {
      grid-gap: 0.5rem;
      padding: 0.75rem;
      padding-left: 0;
    }
  }

  &__content {
    @media screen and (max-width: $breakpoint-sm-max) {
      grid-template-columns: 100%;
    }
  }

  &__indentification,
  &__sumary {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    justify-content: center;
  }

  &__indentification {
    @media screen and (max-width: $breakpoint-sm-max) {
      grid-template-columns: 1fr;
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__code,
  &__status {
    padding-left: 0.75rem;
  }

  &__sumary {
    gap: 0.5rem;

    @media screen and (max-width: $breakpoint-sm-max) {
      flex-direction: column;
      align-items: start;
      padding-left: 0.75rem;
    }

    &-section {
      display: flex;
      gap: 0.5rem;
      align-items: center;

      @media screen and (max-width: $breakpoint-sm-max) {
        flex-direction: column;
        align-items: start;
        gap: 0;
      }
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
