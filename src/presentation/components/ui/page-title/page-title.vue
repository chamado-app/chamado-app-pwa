<script lang="ts" setup>
export type PageTitleProps = {
  title: string
}

defineProps<PageTitleProps>()
</script>

<template>
  <h2 class="text-subtitle1 text-weight-bold page-title">{{ title }}</h2>
</template>

<style lang="scss" scoped>
.page-title {
  font-size: 1rem;

  @media screen and (min-width: $breakpoint-md-min) {
    font-size: 1rem;
  }
}
</style>
