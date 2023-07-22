<script lang="ts" setup>
import { sidebarItems } from './sidebar-items'
</script>

<template>
  <div class="sidebar__wrapper">
    <q-list>
      <q-item
        v-for="(item, index) in sidebarItems"
        :key="index"
        :to="item.to"
        class="sidebar__item"
        clickable
        v-ripple>
        <q-item-section avatar>
          <q-icon :name="item.icon" />
        </q-item-section>

        <q-item-section>{{ item.label }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  &__wrapper {
    padding: 1rem;
  }

  &__item {
    border-radius: 0.5rem;
  }

  &__item.q-router-link--exact-active {
    font-weight: 500;
  }
}
</style>
