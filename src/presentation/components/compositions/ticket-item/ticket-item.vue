<script lang="ts" setup>
import { DateTime } from 'luxon'
import { computed } from 'vue'

const props = defineProps<{
  ticket: {
    id: number
    code: string
    title: string
    lastMessage: {
      content: string
      date: number
    }
    status: string
    totalMessages: number
  }
}>()

const status = computed(() => {
  const statuses: Record<string, any> = {
    aberto: { color: 'primary', text: 'white' },
    respondido: { color: 'secondary', text: 'white' },
    concluido: { color: 'positive', text: 'white' }
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
    :to="{ name: 'ticket-info', params: { id: props.ticket.id } }"
    :class="ticketCardClasses">
    <q-item-section class="ticket-item__content" top>
      <div class="ticket-item__indentification">
        <div class="ticket-item__code text-subtitle2 text-weight-bold">
          <span> #{{ props.ticket.code }} </span>
          <q-btn
            @click.prevent="() => null"
            flat
            round
            icon="mdi-content-copy"
            size="sm"
            dense>
            <q-tooltip
              anchor="top middle"
              self="center middle"
              class="ticket-item__code-tooltip text-mantle"
              :offset="[20, 20]">
              Copiar código
            </q-tooltip>
          </q-btn>
        </div>
        <q-chip
          class="ticket-item__status text-capitalize"
          :ripple="false"
          :color="status.color"
          :text-color="status.text">
          {{ props.ticket.status }}
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
              DateTime.fromMillis(props.ticket.lastMessage.date).toRelative({
                style: 'long',
                round: true
              })
            }}
          </span>
        </div>
        <div class="ticket-item__sumary-section">
          <h4 class="ticket-item__subtitle text-subtitle2">
            {{ props.ticket.lastMessage.content }}
          </h4>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<style lang="scss" scoped>
.ticket-item {
  &__wrapper {
    border-radius: 0.5rem;
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
