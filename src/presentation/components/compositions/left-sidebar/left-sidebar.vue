<script lang="ts" setup>
import { useLeftSidebarController } from './left-sidebar.controler'

const { sidebarItems } = useLeftSidebarController()
</script>

<template>
  <div class="sidebar__wrapper text-body-inverted">
    <div class="sidebar__logo-wrapper">
      <q-img width="12rem" src="@/presentation/assets/logo-typography.svg" />
    </div>
    <q-list>
      <q-item
        v-for="(item, index) in sidebarItems"
        :key="index"
        v-ripple
        :to="item.to"
        class="sidebar__item"
        clickable>
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

  &__logo-wrapper {
    display: flex;
    justify-content: center;
    padding: 0.675rem 0 1.675rem;
  }

  &__item {
    border-radius: 0.5rem;
  }

  &__item.q-router-link--exact-active {
    font-weight: 500;
  }
}
</style>
