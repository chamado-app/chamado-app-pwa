<script lang="ts" setup>
import { AuthTitle } from '@/presentation/components'
import { useAuthenticateController } from '@/presentation/controllers'

import { LOGIN_VALIDATION } from './validation'

const {
  authenticate,
  toggleShowingPassword,
  state,
  passwordFieldType,
  passwordTogglerIcon: togglePasswordIcon
} = useAuthenticateController()
</script>

<template>
  <div class="authenticate__container">
    <AuthTitle
      title="Bem vindo à Chamado.app"
      subtitle="Faça login para continuar" />

    <q-form class="authenticate__form" @submit.prevent="authenticate">
      <QRow gutter="xs">
        <QCol>
          <q-input
            v-model="state.form.email"
            label="E-mail"
            type="email"
            :rules="LOGIN_VALIDATION.email">
            <template #prepend>
              <q-icon name="mdi-email-outline" />
            </template>
          </q-input>
        </QCol>
        <QCol>
          <q-input
            v-model="state.form.password"
            label="Senha"
            :type="passwordFieldType"
            :rules="LOGIN_VALIDATION.password">
            <template #prepend>
              <q-icon name="mdi-lock-outline" />
            </template>
            <template #append>
              <q-btn
                round
                flat
                :icon="togglePasswordIcon"
                @click="toggleShowingPassword" />
            </template>
          </q-input>
        </QCol>
        <QCol class="authenticate__form-submit">
          <q-btn
            :loading="state.loading"
            color="primary"
            label="entrar"
            type="submit" />
        </QCol>
      </QRow>
    </q-form>
  </div>
</template>

<style lang="scss">
.authenticate {
  &__container {
    display: grid;
    grid-gap: 3rem;
  }

  &__form {
    &-submit {
      display: flex;
      justify-content: flex-end;
      margin-top: 1rem;
    }
  }
}
</style>
