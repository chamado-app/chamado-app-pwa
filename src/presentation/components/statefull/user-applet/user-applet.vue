<script lang="ts" setup>
import { computed } from 'vue'

import { useLogoutController } from '@/presentation/controllers'
import { useWhoAmIStore } from '@/presentation/store'
import { useIsMobile } from '@/presentation/utils'

const whoamiStore = useWhoAmIStore()
const { logout, state } = useLogoutController()
const isMobile = useIsMobile()

const fullName = computed(
  () => `${whoamiStore.data?.firstName} ${whoamiStore.data?.lastName}`
)
</script>

<template>
  <q-btn rounded flat no-caps padding="0">
    <div class="avatar-container">
      <q-avatar>
        <q-spinner v-if="state.loading" />
        <q-icon v-else name="mdi-account-circle" />
      </q-avatar>
      <div v-if="!isMobile && !!fullName" class="name">
        {{ fullName }}
      </div>
    </div>
    <q-menu fit anchor="bottom left" self="top left">
      <q-list style="width: max-content" class="user-applet__list">
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

<style lang="scss" scoped>
.avatar-container {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 0.5rem;
}

.name {
  padding-right: 0.5rem;
  font-weight: normal;
}
</style>
