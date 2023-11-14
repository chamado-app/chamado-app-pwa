<script lang="ts" setup>
import { computed } from 'vue'

import { useWhoAmIStore } from '@/presentation/store'

const whoamiStore = useWhoAmIStore()

const fullName = computed(
  () => `${whoamiStore.data?.firstName} ${whoamiStore.data?.lastName}`
)
</script>

<template>
  <q-btn round flat>
    <q-avatar icon="mdi-account-circle" />
    <q-menu anchor="bottom left" self="top left">
      <q-list style="width: max-content" class="user-applet__list">
        <q-item>
          <q-item-section avatar>
            <q-icon name="mdi-account-circle" />
          </q-item-section>
          <q-item-section>{{ fullName }}</q-item-section>
        </q-item>
        <q-separator class="q-my-xs" inset />
        <q-item clickable>
          <q-item-section avatar side>
            <q-icon name="mdi-location-exit" />
          </q-item-section>
          <q-item-section> Fazer logout </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
