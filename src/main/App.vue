<script lang="ts" setup>
import { provide } from 'vue'

import { PROVIDERS } from '@/presentation/providers'

import {
  useAuthenticateUsecase,
  useCreateCategoryUsecase,
  useDeleteCategoryUsecase,
  useListCategoriesUsecase,
  useListTicketsUsecase,
  useNotifier,
  useShowCategoryUsecase
} from './factories'

provide(PROVIDERS.AUTHENTICATE_USECASE, useAuthenticateUsecase())
provide(PROVIDERS.CREATE_CATEGORY_USECASE, useCreateCategoryUsecase())
provide(PROVIDERS.DELETE_CATEGORY_USECASE, useDeleteCategoryUsecase())
provide(PROVIDERS.LIST_CATEGORIES_USECASE, useListCategoriesUsecase())
provide(PROVIDERS.LIST_TICKETS_USECASE, useListTicketsUsecase())
provide(PROVIDERS.SHOW_CATEGORY_USECASE, useShowCategoryUsecase())
provide(PROVIDERS.NOTIFIER, useNotifier())
</script>

<template>
  <router-view />
</template>
