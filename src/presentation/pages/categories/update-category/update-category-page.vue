<script lang="ts" setup>
import { onUnmounted } from 'vue'

import {
  CategoryForm,
  MobileDeleteAction,
  PageModalWrapper
} from '@/presentation/components'
import {
  useDeleteCategoryController,
  useListCategoriesController,
  useUpdateCategoryController
} from '@/presentation/controllers'

const { loadCategories } = useListCategoriesController()
const controller = useUpdateCategoryController({ loadCategories })
const { deleteHandler } = useDeleteCategoryController({ loadCategories })
const { onClose, onSubmit, store, categoryId } = controller

const onDelete = async (): Promise<void> => {
  await deleteHandler(categoryId.value)
  onClose()
}

onUnmounted(() => {
  store.$reset()
})
</script>

<template>
  <PageModalWrapper :is-open="true" title="Atualizar Área" @on-close="onClose">
    <CategoryForm is-update @on-submit="onSubmit" @on-close="onClose" />
    <MobileDeleteAction :delete-handler="onDelete" />
  </PageModalWrapper>
</template>
