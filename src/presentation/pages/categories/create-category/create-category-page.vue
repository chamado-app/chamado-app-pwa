<script lang="ts" setup>
import { onUnmounted } from 'vue'

import { FormActions, PageModalWrapper } from '@/presentation/components'
import {
  useCreateCategoryController,
  useListCategoriesController
} from '@/presentation/controllers'

const { loadCategories } = useListCategoriesController()
const controller = useCreateCategoryController({ loadCategories })
const { onClose, onSubmit, store } = controller

const validation = {
  name: [(value: string) => !!value || 'Nome obrigatório']
}

onUnmounted(() => {
  store.$reset()
})
</script>

<template>
  <PageModalWrapper :is-open="true" title="Cadastrar área" @on-close="onClose">
    <q-form @submit.prevent="onSubmit">
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
      <FormActions :is-loading="store.isSubmitting" @on-cancel="onClose" />
    </q-form>
  </PageModalWrapper>
</template>
