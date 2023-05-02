<script lang="ts" setup></script>

<template>
  <q-layout view="lHr LpR lfr">
    <q-page-container>
      <div class="auth__wrapper">
        <aside class="auth__logo-wrapper bg-gradient">
          <q-icon size="5rem" color="grey-2" name="code" />
          <h1 class="text-h2 text-grey-2">Chamado.app</h1>
        </aside>
        <div class="auth__form-wrapper">Form</div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
$logo-wrapper-width: 44rem;

.auth {
  &__wrapper {
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    width: 100%;
  }

  &__logo {
    &-wrapper {
      width: $logo-wrapper-width;
      max-width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 1.5rem;
    }
  }

  &__form {
    &-wrapper {
      width: calc(100% - $logo-wrapper-width);
      min-width: 50%;
    }
  }
}
</style>
