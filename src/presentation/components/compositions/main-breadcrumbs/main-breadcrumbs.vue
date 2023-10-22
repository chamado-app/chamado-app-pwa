<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const routeMatched = computed(() =>
  route.matched.map(({ meta, name }) => ({ title: meta.title, name }))
)
</script>

<template>
  <q-breadcrumbs align="left" active-color="primary">
    <template v-slot:separator>
      <q-icon size="1rem" name="mdi-arrow-right" />
    </template>
    <q-breadcrumbs-el
      v-for="item in routeMatched"
      :key="item.name"
      :label="(item.title as string)"
      :to="{ name: item.name }" />
  </q-breadcrumbs>
</template>
