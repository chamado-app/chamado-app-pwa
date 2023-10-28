<script lang="ts" setup>
import { PageTitle } from '@/presentation/components'

export type PageWrapperProps = {
  title: string
}

defineProps<PageWrapperProps>()
</script>

<template>
  <PageTitle :title="title" />
  <slot />
</template>
