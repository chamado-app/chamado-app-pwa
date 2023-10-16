<script lang="ts" setup>
export type PageTitleProps = {
  title: string
}

defineProps<PageTitleProps>()
</script>

<template>
  <h2 class="text-h6 q-mb-md">{{ title }}</h2>
</template>
