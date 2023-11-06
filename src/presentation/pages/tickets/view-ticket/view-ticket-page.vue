<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { TicketMessageType, TicketStatus } from '@/domain/entities'
import { PageTitle, Paper } from '@/presentation/components'
import { useShowTicketStore, useWhoAmIStore } from '@/presentation/store'

const route = useRoute()
const ticketId = computed(() => route.params.id as string)
const title = computed(() => {
  const [id] = ticketId.value.split('-')
  return `Chamado #${id.toLocaleUpperCase()}`
})

const store = useShowTicketStore()
const whoamiStore = useWhoAmIStore()

const sentByMe = (ownerId?: string): boolean => {
  return whoamiStore.data?.id === ownerId
}

const getStamp = (date: Date): string => {
  return date.toLocaleString(undefined, {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div class="wrapper">
    <div class="page-title">
      <q-btn flat round dense icon="mdi-arrow-left" />
      <PageTitle :title="title" />
    </div>
    <Paper>
      <q-card-section class="ticket__wrapper">
        <div class="ticket__title">
          <h2 class="text-subtitle1">
            {{ store.data.title }}
          </h2>
          <span class="text-caption">{{ getStamp(store.data.createdAt) }}</span>
        </div>
        <div class="ticket__chat">
          <div class="ticket__chat-messages">
            <template v-for="message in store.data.messages" :key="message.id">
              <q-chat-message
                v-if="message.message.type === TicketMessageType.SYSTEM">
                <template #label>
                  <div class="system-message">
                    <span class="text-weight-bold">
                      {{ message.message.text }}
                    </span>
                    <span>{{ getStamp(message.sentAt) }}</span>
                  </div>
                </template>
              </q-chat-message>
              <q-chat-message
                v-else
                :name="message.owner?.name"
                :avatar="message.owner?.avatar"
                :text="[message.message.text]"
                :sent="sentByMe(message.owner?.id)"
                :bg-color="
                  sentByMe(message.owner?.id) ? 'secondary' : 'primary'
                "
                text-color="white"
                :stamp="getStamp(message.sentAt)" />
            </template>
          </div>
          <div class="ticket__chat-type">
            <q-input
              placeholder="Digite para responder ao chamado..."
              outlined
              model-value=""
              type="text"
              autogrow>
              <template #prepend>
                <q-btn round flat dense icon="mdi-paperclip" />
              </template>
              <template #append>
                <q-btn round flat dense icon="mdi-send" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="ticket-actions">
          <QRow>
            <QCol>
              <label class="info-label" for="responsible">Responsável</label>
              <q-select
                id="responsible"
                model-value="56678f4a-3e56-40b5-bbf4-3d4a3abfa269"
                map-options
                outlined
                dense
                option-label="name"
                option-value="id"
                emit-value
                :options="[
                  {
                    name: 'João da Silva',
                    id: '56678f4a-3e56-40b5-bbf4-3d4a3abfa269',
                    avatar: 'https://cdn.quasar.dev/img/avatar4.jpg'
                  }
                ]">
                <template #selected>
                  <div class="selectable-with-avatar">
                    <q-avatar size="md">
                      <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                    </q-avatar>
                    <span>João da Silva</span>
                  </div>
                </template>
              </q-select>
            </QCol>
            <QCol>
              <label class="info-label">Relator</label>
              <div class="ticket-person__fixed">
                <div class="selectable-with-avatar">
                  <q-avatar size="md">
                    <img src="https://cdn.quasar.dev/img/avatar6.jpg" />
                  </q-avatar>
                  <span>Maria dos Santos</span>
                </div>
              </div>
            </QCol>
            <QCol>
              <q-separator />
            </QCol>
            <QCol>
              <label class="info-label" for="">Área de atuação</label>
              <q-select
                :options="[
                  {
                    label: 'Periféricos',
                    value: TicketStatus.IN_PROGRESS
                  }
                ]"
                :model-value="TicketStatus.IN_PROGRESS"
                emit-value
                map-options
                outlined
                dense />
            </QCol>
            <QCol>
              <label class="info-label" for="">Situação</label>
              <q-select
                :options="[
                  {
                    label: 'Em andamento',
                    value: TicketStatus.IN_PROGRESS
                  }
                ]"
                :model-value="TicketStatus.IN_PROGRESS"
                emit-value
                map-options
                outlined
                dense />
            </QCol>
            <QCol>
              <q-separator />
            </QCol>
            <QCol>
              <label class="info-label">Equipamento</label>
              <div class="equipment">
                <span>
                  <span class="equipment-info">Marca:</span>
                  HP
                </span>
                <span>
                  <span class="equipment-info">Modelo:</span>
                  2774 DeskJet Ink Advantage
                </span>
                <span>
                  <span class="equipment-info">Localização:</span>
                  Sala 05
                </span>
                <span>
                  <span class="equipment-info">Informações adicionais:</span>
                  Costuma apresentar problemas de conexão via USB
                </span>
              </div>
            </QCol>
          </QRow>
          <div class="ticket__actions">
            <q-btn color="negative" flat label="Encerrar chamado" no-caps />
            <q-btn color="positive" label="Solucionar chamado" no-caps />
          </div>
        </div>
      </q-card-section>
    </Paper>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 1rem;
}

.page-title {
  display: grid;
  gap: 0.5rem;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
  align-items: center;
}
.ticket {
  &__wrapper {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem 2rem;
  }

  &__title {
    grid-column: auto / span 12;
    position: relative;
    padding-left: 1rem;
    padding-bottom: 1rem;
    border-bottom-width: 1px;
    border-bottom-style: solid;

    &::before {
      content: '';
      position: absolute;
      height: calc(100% - 1rem);
      width: 0.25rem;
      border-radius: 0.25rem;
      left: 0;
      top: 0;
      background-color: $info;
    }
  }

  &__chat {
    min-height: 36rem;
    border-radius: 0.25rem;
    overflow: hidden;
    padding: 0.75rem;
    grid-column: auto / span 12;
    border-width: 1px;
    border-style: solid;

    @media (min-width: $breakpoint-md-min) {
      grid-column: auto / span 6;
    }

    @media (min-width: $breakpoint-lg-min) {
      grid-column: auto / span 8;
    }

    &-messages {
      min-height: 32rem;
      overflow-y: auto;
    }

    &-type {
      margin-top: auto;
    }
  }

  &-actions {
    display: grid;
    grid-column: auto / span 12;
    align-content: space-between;

    @media (min-width: $breakpoint-md-min) {
      grid-column: auto / span 6;
    }

    @media (min-width: $breakpoint-lg-min) {
      grid-column: auto / span 4;
    }
  }
}

.ticket__actions {
  display: grid;
  gap: 1rem;
  grid-auto-flow: column;
  grid-auto-rows: max-content;
  grid-auto-columns: max-content;
  justify-content: end;
  align-items: center;
}

.selectable-with-avatar {
  display: grid;
  grid-auto-flow: column;
  grid-auto-rows: max-content;
  align-items: center;
  gap: 0.5rem;
  justify-content: start;
}

.ticket-person__fixed {
  height: 2.75rem;
  border-radius: 0.25rem;
  padding: 0 0.75rem;
  display: grid;
  grid-template-columns: 100%;
  align-content: center;
  border: 1px solid rgba(0, 0, 0, 0.24);
}

.system-message {
  display: grid;
  grid-auto-rows: max-content;
  grid-auto-columns: max-content;
  width: fit-content;
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
  background: #eff1f5;
  border-radius: 0.25rem;
  padding: 0.5rem 0.75rem;
}

.info-label {
  font-weight: 700;
}

.equipment {
  display: grid;

  &-info {
    font-weight: 500;
  }
}
</style>
