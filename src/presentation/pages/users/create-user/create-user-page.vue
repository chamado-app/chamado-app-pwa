<script lang="ts" setup>
import { onUnmounted } from 'vue'

import { UserForm, PageModalWrapper } from '@/presentation/components'
import {
  useCreateUserController,
  useListUsersController
} from '@/presentation/controllers'

const { loadUsers } = useListUsersController()
const controller = useCreateUserController({ loadUsers })
const { onClose, onSubmit, store } = controller

onUnmounted(() => {
  store.$reset()
})
</script>

<template>
  <PageModalWrapper
    :is-open="true"
    title="Cadastrar usuário"
    @on-close="onClose">
    <UserForm @on-submit="onSubmit" @on-close="onClose" />
  </PageModalWrapper>
</template>
