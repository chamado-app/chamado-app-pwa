<script lang="ts" setup>
import { onUnmounted } from 'vue'

import { CategoryForm, PageModalWrapper } from '@/presentation/components'
import {
  useCreateCategoryController,
  useListCategoriesController
} from '@/presentation/controllers'

const { loadCategories } = useListCategoriesController()
const controller = useCreateCategoryController({ loadCategories })
const { onClose, onSubmit, store } = controller

onUnmounted(() => {
  store.$reset()
})
</script>

<template>
  <PageModalWrapper :is-open="true" title="Cadastrar área" @on-close="onClose">
    <CategoryForm @on-submit="onSubmit" @on-close="onClose" />
  </PageModalWrapper>
</template>
