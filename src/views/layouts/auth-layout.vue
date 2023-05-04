<script lang="ts" setup></script>

<template>
  <q-layout view="lHr LpR lfr">
    <q-page-container>
      <div class="auth__wrapper">
        <aside class="auth__logo-wrapper bg-gradient">
          <q-icon size="5rem" color="grey-2" name="mdi-code-tags" />
          <h1 class="text-h2 text-grey-2">Chamado.app</h1>
        </aside>
        <q-page class="auth__wrapper-container">
          <router-view />
        </q-page>
      </div>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
.auth {
  &__wrapper {
    min-height: 100vh;
    width: 100%;
    display: grid;
    grid-template-columns: min(72rem, 50%) auto;

    @media (max-width: $breakpoint-sm-max) {
      grid-template-columns: 100%;
    }

    &-container {
      display: grid;
      grid-template-columns: calc(100% - 12rem);
      justify-content: center;
      align-items: center;

      @media (max-width: $breakpoint-sm-max) {
        grid-template-columns: calc(100% - 6rem);
      }
    }
  }

  &__logo {
    &-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 1.5rem;

      @media (max-width: $breakpoint-sm-max) {
        display: none;
      }
    }
  }
}
</style>
