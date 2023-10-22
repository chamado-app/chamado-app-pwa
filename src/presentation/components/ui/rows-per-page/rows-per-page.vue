<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{ modelValue: number }>()
const emit = defineEmits<(event: 'update:modelValue', value: number) => void>()

const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div class="rows-per-page">
    <q-select
      v-model="value"
      :options="[5, 10, 20]"
      borderless
      dense
      class="text-body"
      color="secondary" />

    <span class="text-caption text-weight-medium">Itens por página</span>
  </div>
</template>

<style lang="scss" scoped>
.rows-per-page {
  display: flex;
  align-items: center;
  grid-gap: 0.5rem;
}
</style>
