<script lang="ts" setup>
import { ref } from 'vue'

import { LeftSidebar, UserApplet } from '@/presentation/components'
import { useTogglesStore } from '@/presentation/store'

import HeaderPageTitle from './header-page-title.vue'

const titleHeaderIsMounted = ref(false)

const toggles = useTogglesStore()
</script>

<template>
  <q-layout view="lHh LpR lFr">
    <q-header class="text-body">
      <q-toolbar>
        <div class="toolbar__left-wrapper">
          <q-btn
            dense
            flat
            round
            size="1rem"
            :icon="`mdi-menu${toggles.sidebar ? '-open' : ''}`"
            @click="toggles.toggleSidebar" />

          <HeaderPageTitle @on-mounted="() => (titleHeaderIsMounted = true)" />
        </div>

        <q-space />
        <UserApplet />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="toggles.sidebar" show-if-above side="left">
      <LeftSidebar />
    </q-drawer>

    <q-page-container>
      <q-page v-if="titleHeaderIsMounted" class="page__container" padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.toolbar {
  &__left-wrapper {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
}

.page {
  &__container {
    display: grid;
    grid-auto-rows: max-content;
    grid-template-columns: 100%;
    gap: 0.5rem;

    @media screen and (min-width: $breakpoint-sm-min) {
      gap: 1.25rem;
    }
  }
}
</style>
