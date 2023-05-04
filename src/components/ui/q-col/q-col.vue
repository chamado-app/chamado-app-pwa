<script setup lang="ts">
import { computed } from 'vue'

import type { QColSizes } from './types'

export type QColProps = {
  sm?: QColSizes
  md?: QColSizes
  lg?: QColSizes
  xl?: QColSizes
}

const props = defineProps<QColProps>()

const classes = computed(() => {
  const classes: string[] = ['col-12']
  if (props.sm) classes.push(`col-sm-${props.sm.toString()}`)
  if (props.md) classes.push(`col-md-${props.md.toString()}`)
  if (props.lg) classes.push(`col-lg-${props.lg.toString()}`)
  if (props.xl) classes.push(`col-xl-${props.xl.toString()}`)
  return classes
})
</script>

<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
