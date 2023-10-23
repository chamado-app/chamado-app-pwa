<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import {
  MainWrapper,
  NoRegisters,
  PageTitle,
  PaginationFooter
} from '@/presentation/components'

const props = defineProps<{
  total: number
  pages: number
  skip: number
  take: number
  page: number
  search: string
  noRegisters: boolean
  noRegistersTitle?: string
  noRegistersMessage?: string
  noRegistersFormPath?: string
  noRegistersButtonLabel?: string
}>()

const emit = defineEmits<{
  'update:take': [number]
  'update:page': [number]
  'update:search': [string]
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

const searchValue = computed({
  get: () => props.search,
  set: (value) => {
    emit('update:search', value)
  }
})

const route = useRoute()
const title = computed(() => route.meta.title as string)
</script>

<template>
  <template v-if="noRegisters">
    <slot name="no-registers">
      <NoRegisters
        :title="noRegistersTitle"
        :message="noRegistersMessage"
        :button-label="noRegistersButtonLabel"
        :form-path="noRegistersFormPath" />
    </slot>
  </template>
  <MainWrapper v-else class="table-wrapper">
    <q-card-section class="table-wrapper__section table-wrapper__header">
      <PageTitle :title="title" />
      <q-input
        v-model="searchValue"
        debounce="400"
        dense
        outlined
        placeholder="Pesquisar...">
        <template #append>
          <q-icon name="mdi-magnify" />
        </template>
      </q-input>
    </q-card-section>
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
  grid-template-columns: 100%;
  gap: 1rem;
  padding: 1rem;

  &__section {
    padding: 0;
  }

  &__header {
    display: grid;
    gap: 0.75rem;

    @media screen and (min-width: $breakpoint-sm-min) {
      grid-template-columns: auto 16rem;
    }

    @media screen and (min-width: $breakpoint-md-min) {
      grid-template-columns: auto 24rem;
    }
  }
}
</style>
