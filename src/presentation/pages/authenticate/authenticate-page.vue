<script lang="ts" setup>
import { AuthTitle } from '@/presentation/components'
import { useAuthenticateController } from '@/presentation/controllers'

const { authenticate, state } = useAuthenticateController()
</script>

<template>
  <div class="authenticate__container">
    <AuthTitle
      title="Bem vindo à Chamado.app"
      subtitle="Faça login para continuar" />

    <q-form class="authenticate__form" @submit.prevent="authenticate">
      <QRow gutter="lg">
        <QCol>
          <q-input label="E-mail" type="email" v-model="state.form.email">
            <template v-slot:prepend>
              <q-icon name="mdi-email-outline" />
            </template>
          </q-input>
        </QCol>
        <QCol>
          <q-input label="Senha" type="password" v-model="state.form.password">
            <template v-slot:prepend>
              <q-icon name="mdi-lock-outline" />
            </template>
            <template v-slot:append>
              <q-btn round flat icon="mdi-eye-off-outline" />
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
