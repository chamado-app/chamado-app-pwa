<script lang="ts" setup>
import { computed } from 'vue'

import { useLogoutController } from '@/presentation/controllers'
import { useWhoAmIStore } from '@/presentation/store'

const whoamiStore = useWhoAmIStore()
const { logout, state } = useLogoutController()

const fullName = computed(
  () => `${whoamiStore.data?.firstName} ${whoamiStore.data?.lastName}`
)
</script>

<template>
  <q-btn round flat>
    <q-avatar>
      <q-spinner v-if="state.loading" />
      <q-icon v-else name="mdi-account-circle" />
    </q-avatar>
    <q-menu anchor="bottom left" self="top left">
      <q-list style="width: max-content" class="user-applet__list">
        <q-item>
          <q-item-section avatar>
            <q-icon name="mdi-account-circle" />
          </q-item-section>
          <q-item-section>{{ fullName }}</q-item-section>
        </q-item>
        <q-separator class="q-my-xs" inset />
        <q-item v-close-popup clickable @click="logout">
          <q-item-section avatar side>
            <q-icon name="mdi-location-exit" />
          </q-item-section>
          <q-item-section> Fazer logout </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
