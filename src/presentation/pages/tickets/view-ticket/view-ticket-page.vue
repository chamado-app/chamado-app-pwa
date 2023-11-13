<script lang="ts" setup>
import { QVirtualScroll } from 'quasar'
import { computed, onMounted, ref, watch } from 'vue'

import { constants } from '@/constants'
import { TicketMessageType, TicketStatus } from '@/domain/entities'
import { FirstLoadingList, PageTitle, Paper } from '@/presentation/components'
import { TICKET_STATUS_MAPPED } from '@/presentation/components/statefull/ticket/status-mapped'
import {
  useCancelTicketController,
  useChangeTicketAssignedController,
  useCompleteTicketController,
  useFetchCategoriesController,
  useFetchUsersController,
  useSendTicketTextMessageController,
  useShowTicketController
} from '@/presentation/controllers'
import { useWhoAmIStore } from '@/presentation/store'

const chat = ref<QVirtualScroll | null>(null)
const whoami = useWhoAmIStore()
const { store, loadTicket, ticketId } = useShowTicketController()

const { fetchUsers, store: usersStore } = useFetchUsersController()

const fetchCategoriesController = useFetchCategoriesController()
const { fetchCategories, store: categoriesStore } = fetchCategoriesController

const sentTextMessage = useSendTicketTextMessageController({ loadTicket })
const { onSent, state: sendTextMessageState } = sentTextMessage

const cancelTicket = useCancelTicketController({ loadTicket })
const { onCancelTicket, state: cancelTicketState } = cancelTicket

const completeTicket = useCompleteTicketController({ loadTicket })
const { onCompleteTicket, state: completeTicketState } = completeTicket

const changeTicketAssigned = useChangeTicketAssignedController({ loadTicket })
const { onChangeTicketAssigned, state: changeTicketAssignedState } =
  changeTicketAssigned

const getStamp = (date?: Date): string => {
  if (!date) return ''
  return date.toLocaleString(undefined, {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const title = computed(() => {
  const [id] = ticketId.value.split('-')
  return `Chamado #${id.toLocaleUpperCase()}`
})

const isOwnerAuthenticated = computed(() => {
  if (!store.data?.reportedBy) return false
  return whoami.data?.id === store.data.reportedBy.id
})

const highlight = computed(() => {
  if (!store.data?.status) return ''
  const status = TICKET_STATUS_MAPPED.find(
    (status) => status.value === store.data.status
  )
  if (!status) return ''
  return `ticket__title-${status.color}`
})

const enabledAction = computed(() => {
  return ![TicketStatus.DONE, TicketStatus.CANCELLED].includes(
    store.data.status
  )
})

const scrollChatToEnd = (length: number = 0): void => {
  if (!chat.value) return
  chat.value.scrollTo(length, 'start-force')
}

watch(() => chat.value?.items?.length, scrollChatToEnd)

onMounted(() => {
  void loadTicket()
  void fetchUsers()
  void fetchCategories()
})
</script>

<template>
  <div class="wrapper">
    <div class="page-title">
      <q-btn
        :to="{ name: constants.routes.tickets.list }"
        flat
        round
        dense
        icon="mdi-arrow-left" />
      <PageTitle :title="title" />
    </div>
    <Paper>
      <FirstLoadingList v-if="store.isLoading" class="no-results" />
      <q-card-section v-else class="ticket__wrapper">
        <div :class="['ticket__title', highlight]">
          <h2 class="text-subtitle1">
            {{ store.data.title }}
          </h2>
          <span class="text-caption">{{ getStamp(store.data.createdAt) }}</span>
        </div>
        <div class="ticket__chat">
          <q-virtual-scroll
            ref="chat"
            v-slot="{ item: message, index }"
            :items="store.data.messages"
            :items-size="store.data.messages.length"
            separator
            class="ticket__chat-messages">
            <div :key="index">
              <q-chat-message v-if="message.type === TicketMessageType.SYSTEM">
                <template #label>
                  <div class="system-message">
                    <span class="text-weight-bold">
                      {{ message.text }}
                    </span>
                    <span>{{ getStamp(message.sentAt) }}</span>
                  </div>
                </template>
              </q-chat-message>
              <q-chat-message
                v-else
                :name="message.sentBy.name"
                :text="[message.text]"
                :sent="message.sentByMe"
                :bg-color="message.sentByMe ? 'secondary' : 'primary'"
                text-color="white"
                :stamp="getStamp(message.sentAt)">
                <template #avatar>
                  <q-avatar
                    class="q-mx-xs"
                    color="blue-grey-1"
                    :text-color="message.sentByMe ? 'secondary' : 'primary'"
                    icon="mdi-account" />
                </template>
              </q-chat-message>
            </div>
          </q-virtual-scroll>
          <div class="ticket__chat-type">
            <q-input
              v-model="sendTextMessageState.message"
              placeholder="Digite para responder ao chamado..."
              outlined
              type="text"
              :disable="sendTextMessageState.isSending"
              autogrow
              @keyup.enter.exact.prevent.stop="onSent">
              <template #append>
                <q-btn
                  round
                  flat
                  dense
                  icon="mdi-send"
                  :loading="sendTextMessageState.isSending"
                  @click="onSent" />
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
                :model-value="store.data.assignedTo"
                :style="{ minHeight: '2.75rem' }"
                :disable="
                  isOwnerAuthenticated || changeTicketAssignedState.isLoading
                "
                map-options
                outlined
                dense
                option-label="name"
                option-value="id"
                emit-value
                :label="
                  store.data.assignedTo
                    ? undefined
                    : 'Nenhum responsável atribuído'
                "
                :loading="
                  usersStore.isLoading || changeTicketAssignedState.isLoading
                "
                :options="usersStore.users"
                @update:model-value="onChangeTicketAssigned">
                <template #selected-item="ops">
                  <div class="selectable-with-avatar">
                    <q-avatar
                      class="q-ml-xs"
                      size="md"
                      color="blue-grey-1"
                      icon="mdi-account" />
                    <span>
                      {{ ops.opt.name }}
                    </span>
                  </div>
                </template>
              </q-select>
            </QCol>
            <QCol>
              <label class="info-label">Relator</label>
              <div class="ticket-person__fixed">
                <div class="selectable-with-avatar">
                  <q-avatar
                    class="q-ml-xs"
                    size="md"
                    color="blue-grey-1"
                    icon="mdi-account" />
                  <span>{{ store.data.reportedBy?.name }}</span>
                </div>
              </div>
            </QCol>
            <QCol>
              <q-separator />
            </QCol>
            <QCol>
              <label class="info-label" for="">Área de atuação</label>
              <q-select
                :model-value="store.data.category"
                :options="categoriesStore.categories"
                :loading="categoriesStore.isLoading"
                disable
                option-label="name"
                option-value="id"
                map-options
                outlined
                dense />
            </QCol>
            <QCol>
              <label class="info-label" for="">Situação</label>
              <q-select
                :model-value="store.data.status"
                :disable="isOwnerAuthenticated"
                :options="TICKET_STATUS_MAPPED"
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
                  <span class="equipment-info">Descrição:</span>
                  {{ store.data.equipment?.name || '-' }}
                </span>
                <span>
                  <span class="equipment-info">Marca:</span>
                  {{ store.data.equipment?.brand || '-' }}
                </span>
                <span>
                  <span class="equipment-info">Modelo:</span>
                  {{ store.data.equipment?.model || '-' }}
                </span>
                <span>
                  <span class="equipment-info">Localização:</span>
                  {{ store.data.equipment?.section || '-' }}
                </span>
                <span>
                  <span class="equipment-info">Informações adicionais:</span>
                  {{ store.data.equipment?.additionalInfo || '-' }}
                </span>
              </div>
            </QCol>
          </QRow>
          <div class="ticket__actions">
            <q-btn
              v-if="isOwnerAuthenticated && !enabledAction"
              color="negative"
              flat
              label="Cancelar chamado"
              no-caps
              :loading="cancelTicketState.isLoading"
              @click="onCancelTicket" />
            <q-btn
              v-if="!isOwnerAuthenticated && !enabledAction"
              color="positive"
              label="Encerrar chamado"
              no-caps
              :loading="completeTicketState.isLoading"
              @click="onCompleteTicket" />
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
    }

    &-primary::before {
      background-color: $primary;
    }

    &-secondary::before {
      background-color: $secondary;
    }

    &-info::before {
      background-color: $info;
    }

    &-positive::before {
      background-color: $positive;
    }

    &-waring::before {
      background-color: $warning;
    }

    &-negative::before {
      background-color: $negative;
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
      height: 32rem;
      overflow-y: auto;
      padding: 0 0.5rem 0.5rem 0;
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
