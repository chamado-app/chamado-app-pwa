<script lang="ts" setup>
export type PageTitleProps = {
  title: string
}

defineProps<PageTitleProps>()
</script>

<template>
  <h2 class="text-h6 text-subtitle1 text-weight-bold">{{ title }}</h2>
</template>
