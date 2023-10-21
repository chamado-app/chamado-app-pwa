<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { GlobalSearch, LeftSidebar } from '@/presentation/components'
import { useTogglesStore } from '@/presentation/store'

const route = useRoute()
const toggles = useTogglesStore()
const routeMatched = computed(() =>
  route.matched.map(({ meta, name }) => ({ title: meta.title, name }))
)
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
        <q-breadcrumbs align="left" active-color="primary">
          <template v-slot:separator>
            <q-icon name="mdi-arrow-right" />
          </template>
          <q-breadcrumbs-el
            v-for="item in routeMatched"
            :key="item.name"
            :label="(item.title as string)"
            :to="{ name: item.name }" />
        </q-breadcrumbs>
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
