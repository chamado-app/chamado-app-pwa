<script lang="ts" setup>
import { onUnmounted } from 'vue'

import { CategoryForm, PageModalWrapper } from '@/presentation/components'
import {
  useListCategoriesController,
  useUpdateCategoryController
} from '@/presentation/controllers'

const { loadCategories } = useListCategoriesController()
const controller = useUpdateCategoryController({ loadCategories })
const { onClose, onSubmit, store } = controller

onUnmounted(() => {
  store.$reset()
})
</script>

<template>
  <PageModalWrapper :is-open="true" title="Atualizar Área" @on-close="onClose">
    <CategoryForm is-update @on-submit="onSubmit" @on-close="onClose" />
  </PageModalWrapper>
</template>
