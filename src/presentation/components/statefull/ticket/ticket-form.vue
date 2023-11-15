<script setup lang="ts">
import { FormActions } from '@/presentation/components'
import {
  useFetchCategoriesController,
  useFetchEquipmentsController
} from '@/presentation/controllers'
import { useCreateTicketStore } from '@/presentation/store'

import { TICKET_FORM_VALIDATION } from '.'

defineEmits<{
  onSubmit: []
  onClose: []
}>()

const store = useCreateTicketStore()
const { store: fetchCategoriesStore } = useFetchCategoriesController()
const { store: fetchEquipmentsStore } = useFetchEquipmentsController()
const validation = TICKET_FORM_VALIDATION
</script>

<template>
  <q-form @submit.prevent="() => $emit('onSubmit')">
    <QRow gutter="sm">
      <QCol>
        <q-input
          v-model="store.form.title"
          :rules="validation.title"
          label="Título"
          outlined />
      </QCol>
      <QCol>
        <q-select
          v-model="store.form.categoryId"
          :options="fetchCategoriesStore.categories"
          :rules="validation.categoryId"
          option-label="name"
          option-value="id"
          label="Tipo do problema"
          map-options
          emit-value
          outlined />
      </QCol>
      <QCol>
        <q-select
          v-model="store.form.equipmentId"
          :options="fetchEquipmentsStore.equipments"
          :rules="validation.equipmentId"
          option-label="name"
          option-value="id"
          label="Equipamento que apresenta o problema"
          map-options
          emit-value
          outlined />
      </QCol>

      <QCol>
        <q-input
          v-model="store.form.message"
          :rules="validation.message"
          :maxlength="1024"
          input-class="ticket-description"
          label="Descrição do problema"
          autogrow
          type="textarea"
          counter
          outlined />
      </QCol>
    </QRow>
    <FormActions
      :is-loading="store.isSubmitting"
      @on-cancel="() => $emit('onClose')" />
  </q-form>
</template>

<style lang="scss">
.ticket-description {
  min-height: 6rem !important;
}
</style>
