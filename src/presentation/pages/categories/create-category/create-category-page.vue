<script lang="ts" setup>
import { FormActions, PageModalWrapper } from '@/presentation/components'
import { useCreateCategoryController } from '@/presentation/controllers'

const { store, onSubmit, onCancel } = useCreateCategoryController()
</script>

<template>
  <PageModalWrapper :is-open="true" title="Cadastrar área" @on-close="onCancel">
    <q-form @submit.prevent="onSubmit">
      <QRow gutter="sm">
        <QCol>
          <q-input
            v-model="store.form.name"
            :rules="[() => 'texto']"
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
      <FormActions @on-cancel="onCancel" />
    </q-form>
  </PageModalWrapper>
</template>
