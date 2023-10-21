<script setup lang="ts">
import { computed } from 'vue'

import { PaginationInfo, RowsPerPage } from '@/presentation/components/ui'

const props = defineProps<{
  total: number
  pages: number
  skip: number
  take: number
  page: number
}>()

const emit = defineEmits<{
  'update:take': [number]
  'update:page': [number]
}>()

const takeValue = computed({
  get: () => props.take,
  set: (value) => {
    emit('update:take', value)
  }
})

const pageValue = computed({
  get: () => props.page,
  set: (value) => {
    emit('update:page', value)
  }
})
</script>

<template>
  <div class="pagination-footer">
    <RowsPerPage v-model="takeValue" />
    <div class="pagination-footer__info">
      <PaginationInfo :total="total" :skip="skip" :take="takeValue" />
      <q-pagination
        v-model="pageValue"
        :max-pages="6"
        :max="pages"
        flat
        direction-links
        color="secondary" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pagination-footer {
  display: grid;
  justify-content: space-between;
  align-items: center;
  grid-auto-flow: column;
  width: 100%;

  &__info {
    display: grid;
    grid-gap: 0.5rem;
    grid-auto-flow: column;
    align-items: center;
  }
}
</style>

<style lang="scss">
.body--light .pagination-footer .q-field__native {
  color: $text;
}
</style>
