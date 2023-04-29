<template>
  <q-page class="row items-center justify-evenly coming-soon-wrapper">
    <h1 class="text-white">Em breve...</h1>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ComingSoon'
})
</script>

<style lang="scss">
.coming-soon-wrapper {
  background-image: linear-gradient(
    135deg,
    var(--q-primary),
    var(--q-secondary)
  );
}
</style>
