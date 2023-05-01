<script lang="ts" setup>
import { computed } from 'vue'

export type QRowProps = {
  gutter?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<QRowProps>(), { gutter: 'md' })
const gutter = computed(() => `q-col-gutter-${props.gutter}`)
</script>

<template>
  <div class="row">
    <div class="col">
      <div class="row" :class="gutter">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
