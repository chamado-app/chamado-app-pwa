<script lang="ts" setup>
import { DateTime } from 'luxon'
import { computed } from 'vue'

const props = defineProps<{
  ticket: {
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
</script>

<template>
  <q-card
    :class="['ticket-card__wrapper', `ticket-card__wrapper-${status.color}`]">
    <q-card-section class="ticket-card__content">
      <div class="ticket-card__indentification">
        <div class="ticket-card__code text-subtitle2 text-weight-bold">
          #{{ props.ticket.code }}
        </div>
        <q-chip
          class="ticket-card__status text-capitalize"
          :ripple="false"
          :color="status.color"
          :text-color="status.text">
          {{ props.ticket.status }}
        </q-chip>
      </div>
      <div class="ticket-card__sumary">
        <div class="ticket-card__sumary-section">
          <h3 class="ticket-card__title text-subtitle1 text-weight-bold">
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
        <div class="ticket-card__sumary-section">
          <h4 class="ticket-card__subtitle text-subtitle2">
            {{ props.ticket.lastMessage.content }}
          </h4>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.ticket-card {
  &__wrapper {
    border-radius: 0.5rem;
    border-width: 1px;
    border-style: solid;

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

  &__status {
    border-radius: 0 1rem 1rem 0;
    margin: 0;
  }
}
</style>
