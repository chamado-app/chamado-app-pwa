<script lang="ts" setup>
import { onUnmounted } from 'vue'

import {
  UserForm,
  MobileDeleteAction,
  PageModalWrapper
} from '@/presentation/components'
import {
  useDeleteCategoryController,
  useListUsersController,
  useUpdateUserController
} from '@/presentation/controllers'

const { loadUsers } = useListUsersController()
const controller = useUpdateUserController({ loadUsers })
const { deleteHandler } = useDeleteCategoryController({
  loadCategories: loadUsers
})
const { onClose, onSubmit, store, userId } = controller

const onDelete = async (): Promise<void> => {
  await deleteHandler(userId.value)
  onClose()
}

onUnmounted(() => {
  store.$reset()
})
</script>

<template>
  <PageModalWrapper
    :is-open="true"
    title="Atualizar Usuário"
    @on-close="onClose">
    <UserForm is-update @on-submit="onSubmit" @on-close="onClose" />
    <MobileDeleteAction :delete-handler="onDelete" />
  </PageModalWrapper>
</template>
