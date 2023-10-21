<script lang="ts" setup>
import { computed } from 'vue'

import { MainWrapper, PaginationFooter } from '@/presentation/components'

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
  <MainWrapper class="table-wrapper">
    <q-card-section class="table-wrapper__section">
      <slot />
    </q-card-section>
    <q-card-section class="flex justify-between table-wrapper__section">
      <slot name="footer">
        <PaginationFooter
          :pages="pages"
          :skip="skip"
          :total="total"
          v-model:page="pageValue"
          v-model:take="takeValue" />
      </slot>
    </q-card-section>
  </MainWrapper>
</template>

<style lang="scss" scoped>
.table-wrapper {
  display: grid;
  gap: 1rem;
  padding: 1rem;

  &__section {
    padding: 0;
  }
}
</style>
