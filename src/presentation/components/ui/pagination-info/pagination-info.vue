<script lang="ts" setup>
import { computed } from 'vue'

export type PaginationInfoProps = {
  total: number
  skip: number
  take: number
}

const props = defineProps<PaginationInfoProps>()

const informationText = computed(() => {
  const firstRow = props.skip + 1
  const lastRow = props.skip + props.take
  const realLastRow = lastRow < props.total ? lastRow : props.total

  return `${firstRow}-${realLastRow} de ${props.total} registros`
})
</script>

<template>
  <div class="text-caption text-weight-medium">
    {{ informationText }}
  </div>
</template>
