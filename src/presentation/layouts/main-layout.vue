<script lang="ts" setup>
import { GlobalSearch, LeftSidebar } from '@/presentation/components'
import { useToggles } from '@/presentation/stores'

const toggles = useToggles()
</script>

<template>
  <q-layout view="hHh LpR lFr">
    <q-header class="bg-gradient text-white">
      <q-toolbar>
        <div class="toolbar__left-wrapper">
          <q-btn
            dense
            flat
            round
            size="1rem"
            :icon="`mdi-menu${toggles.sidebar ? '-open' : ''}`"
            @click="toggles.toggleSidebar" />

          <GlobalSearch />
        </div>

        <q-space />
        <q-btn round flat>
          <q-avatar icon="mdi-account-circle" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="toggles.sidebar" side="left">
      <LeftSidebar />
    </q-drawer>

    <q-page-container>
      <q-page padding>
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
</style>
