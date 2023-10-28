<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { FormActions, PageModalWrapper } from '@/presentation/components'

const router = useRouter()

const state = reactive({ name: '', description: '' })

const onClose = (): void => {
  router.back()
}

const onSubmit = (): void => {
  console.log(state)
}
</script>

<template>
  <PageModalWrapper :is-open="true" title="Cadastrar área" @on-close="onClose">
    <q-form @submit.prevent="onSubmit">
      <QRow>
        <QCol>
          <q-input v-model="state.name" label="Nome" outlined />
        </QCol>
        <QCol>
          <q-input v-model="state.description" label="Descrição" outlined />
        </QCol>
        <QCol>
          <FormActions />
        </QCol>
      </QRow>
    </q-form>
  </PageModalWrapper>
</template>
