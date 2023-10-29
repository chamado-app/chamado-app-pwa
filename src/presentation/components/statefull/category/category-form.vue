<script setup lang="ts">
import { FormActions } from '@/presentation/components'
import { useShowCategoryStore } from '@/presentation/store'

import { CATEGORY_FORM_VALIDATION } from '.'

defineEmits<{
  onSubmit: []
  onClose: []
}>()

const store = useShowCategoryStore()
const validation = CATEGORY_FORM_VALIDATION
</script>

<template>
  <q-form @submit.prevent="() => $emit('onSubmit')">
    <QRow gutter="sm">
      <QCol>
        <q-input
          v-model="store.form.name"
          autofocus
          :rules="validation.name"
          label="Nome"
          outlined />
      </QCol>
      <QCol>
        <q-input
          v-model="store.form.description"
          bottom-slots
          label="Descrição"
          outlined />
      </QCol>
      <QCol>
        <q-toggle v-model="store.form.isActive" label="Área ativa" />
      </QCol>
    </QRow>
    <FormActions
      :is-loading="store.isSubmitting"
      @on-cancel="() => $emit('onClose')" />
  </q-form>
</template>
