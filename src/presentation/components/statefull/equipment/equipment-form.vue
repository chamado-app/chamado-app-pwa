<script setup lang="ts">
import { FormActions } from '@/presentation/components'
import { useShowEquipmentStore } from '@/presentation/store'

import { EQUIPMENT_FORM_VALIDATION, EQUIPMENT_STATUS_MAPPED } from '.'

export type EquipmentFormProps = {
  isUpdate?: boolean
}

defineEmits<{
  onSubmit: []
  onClose: []
}>()

defineProps<EquipmentFormProps>()
const store = useShowEquipmentStore()
const validation = EQUIPMENT_FORM_VALIDATION
</script>

<template>
  <q-form @submit.prevent="() => $emit('onSubmit')">
    <QRow gutter="sm">
      <QCol>
        <q-input
          v-model="store.form.name"
          :autofocus="!isUpdate"
          :rules="validation.name"
          label="Nome"
          outlined />
      </QCol>
      <QCol md="6">
        <q-input
          v-model="store.form.brand"
          :rules="validation.brand"
          label="Marca"
          outlined />
      </QCol>
      <QCol md="6">
        <q-input
          v-model="store.form.model"
          :rules="validation.model"
          label="Modelo"
          outlined />
      </QCol>
      <QCol>
        <q-input
          v-model="store.form.type"
          :rules="validation.section"
          placeholder="Ex: notebook"
          label="Tipo"
          outlined />
      </QCol>
      <QCol>
        <q-input
          v-model="store.form.section"
          :rules="validation.section"
          placeholder="Ex: sala de informática"
          label="Seção"
          outlined />
      </QCol>
      <QCol md="6">
        <q-input
          v-model="store.form.serial"
          :rules="validation.serial"
          label="Número de série"
          outlined />
      </QCol>
      <QCol md="6">
        <q-input
          v-model="store.form.patrimony"
          :rules="validation.patrimony"
          label="Patrimônio"
          outlined />
      </QCol>
      <QCol>
        <q-select
          v-model="store.form.status"
          :rules="validation.status"
          label="Situação"
          map-options
          emit-value
          :options="EQUIPMENT_STATUS_MAPPED"
          outlined />
      </QCol>
      <QCol>
        <q-input
          v-model="store.form.additionalInfo"
          :rules="validation.additionalInfo"
          :maxlength="255"
          label="Informações adicionais"
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
