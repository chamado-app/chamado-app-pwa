<script lang="ts" setup>
import { computed } from 'vue'

import {
  CreateFloatButton,
  FirstLoadingList,
  NoRegisters,
  NoResults,
  PageWrapper,
  PaginationFooter,
  Paper
} from '@/presentation/components'

const props = defineProps<{
  total: number
  pages: number
  skip: number
  take: number
  page: number
  search: string
  createRegisterLabel: string
  noResults: boolean
  noRegisters: boolean
  isFirstLoading: boolean
  formPath: string
  noRegistersMessage?: string
  noRegistersButtonLabel?: string
  title: string
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
</script>

<template>
  <PageWrapper :title="title">
    <template v-if="noRegisters">
      <slot name="no-registers">
        <NoRegisters
          :title="createRegisterLabel"
          :message="noRegistersMessage"
          :button-label="noRegistersButtonLabel"
          :form-path="formPath" />
      </slot>
    </template>
    <Paper v-else class="table-wrapper">
      <q-card-section class="table-wrapper__section table-wrapper__header">
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

      <template v-if="isFirstLoading">
        <slot name="first-loading-list">
          <FirstLoadingList />
        </slot>
      </template>
      <template v-else-if="noResults">
        <slot name="no-results">
          <NoResults />
        </slot>
      </template>
      <template v-else>
        <q-card-section class="table-wrapper__section">
          <slot />
        </q-card-section>
        <q-card-section class="flex justify-between table-wrapper__section">
          <slot name="footer">
            <PaginationFooter
              v-model:page="pageValue"
              v-model:take="takeValue"
              :pages="pages"
              :skip="skip"
              :total="total" />
          </slot>
        </q-card-section>
      </template>
    </Paper>
    <CreateFloatButton :form-path="formPath" :label="createRegisterLabel" />
  </PageWrapper>
</template>

<style lang="scss" scoped>
.table-wrapper {
  display: grid;
  grid-template-columns: 100%;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 5.25rem;

  @media screen and (min-width: $breakpoint-sm-min) {
    margin-bottom: 4rem;
  }

  &__section {
    padding: 0;
  }

  &__header {
    display: grid;
    gap: 0.75rem;

    @media screen and (min-width: $breakpoint-sm-min) {
      grid-template-columns: 16rem;
    }

    @media screen and (min-width: $breakpoint-md-min) {
      grid-template-columns: 24rem;
    }
  }
}
</style>
