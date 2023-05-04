<script lang="ts">
import { defineComponent } from 'vue'

import { AuthTitle } from '@/components'

export default defineComponent({
  components: { AuthTitle }
})
</script>

<template>
  <q-page class="login__wrapper">
    <div class="login__container">
      <AuthTitle
        title="Bem vindo à Chamado.app"
        subtitle="Faça login para continuar" />

      <q-form class="login__form">
        <QRow gutter="lg">
          <QCol>
            <q-input label="E-mail" type="email">
              <template v-slot:prepend>
                <q-icon name="mdi-email-outline" />
              </template>
            </q-input>
          </QCol>
          <QCol>
            <q-input label="Senha" type="password">
              <template v-slot:prepend>
                <q-icon name="mdi-lock-outline" />
              </template>
              <template v-slot:append>
                <q-btn round flat icon="mdi-eye-off-outline" />
              </template>
            </q-input>
          </QCol>
          <QCol class="login__form-submit">
            <q-btn label="entrar" color="primary" />
          </QCol>
        </QRow>
      </q-form>
    </div>
  </q-page>
</template>

<style lang="scss">
.login {
  &__wrapper {
    display: grid;
    grid-template-columns: calc(100% - 12rem);
    justify-content: center;
    align-items: center;

    @media (max-width: $breakpoint-sm-max) {
      grid-template-columns: calc(100% - 6rem);
    }
  }

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
