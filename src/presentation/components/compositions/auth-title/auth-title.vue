<script lang="ts" setup>
export type AuthTitleProps = {
  title: string
  subtitle: string
}

const props = defineProps<AuthTitleProps>()
</script>

<template>
  <div class="auth__title">
    <h1 class="text-h4 text-weight-medium">{{ props.title }}</h1>
    <h2 class="text-h5 text-subtitle text-weight-regular">
      {{ props.subtitle }}
    </h2>
  </div>
</template>

<style lang="scss">
.auth__title {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
}
</style>
