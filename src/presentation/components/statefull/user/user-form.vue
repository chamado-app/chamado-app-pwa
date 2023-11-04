<script setup lang="ts">
import { ref } from 'vue'

import { FormActions } from '@/presentation/components'
import { useShowUserStore } from '@/presentation/store'

import { USER_FORM_VALIDATION, USER_ROLES_FORM } from '.'

export type UserFormProps = {
  isUpdate?: boolean
}

defineEmits<{
  onSubmit: []
  onClose: []
}>()

defineProps<UserFormProps>()
const store = useShowUserStore()
const validation = USER_FORM_VALIDATION

const showPassword = ref(true)

const toggleShowPassword = (): void => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <q-form
    autocorrect="off"
    autocapitalize="off"
    autocomplete="off"
    spellcheck="false"
    @submit.prevent="() => $emit('onSubmit')">
    <QRow gutter="sm">
      <QCol>
        <q-input
          v-model="store.form.firstName"
          :autofocus="!isUpdate"
          :rules="validation.firstName"
          label="Nome"
          outlined />
      </QCol>
      <QCol>
        <q-input
          v-model="store.form.lastName"
          :rules="validation.lastName"
          label="Sobrenome"
          outlined />
      </QCol>
      <QCol>
        <q-input
          v-model="store.form.email"
          :rules="validation.email"
          label="E-mail"
          type="email"
          outlined />
      </QCol>
      <QCol>
        <q-input
          v-model="store.form.password"
          :rules="validation.password"
          label="Senha do usuário"
          :type="showPassword ? 'text' : 'password'"
          outlined>
          <template #append>
            <q-btn
              flat
              round
              dense
              :icon="`mdi-${showPassword ? 'eye' : 'eye-off'}`"
              @click="toggleShowPassword" />
          </template>
        </q-input>
      </QCol>
      <QCol>
        <q-select
          v-model="store.form.roles"
          :options="USER_ROLES_FORM"
          :rules="validation.roles"
          label="Tipo de usuário"
          use-chips
          map-options
          multiple
          emit-value
          outlined />
      </QCol>
      <QCol>
        <q-toggle v-model="store.form.isActive" label="Usuário ativo" />
      </QCol>
    </QRow>
    <FormActions
      :is-loading="store.isSubmitting"
      @on-cancel="() => $emit('onClose')" />
  </q-form>
</template>
