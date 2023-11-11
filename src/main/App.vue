<script lang="ts" setup>
import { provide } from 'vue'

import { PROVIDERS } from '@/presentation/providers'

import {
  useAuthenticateUsecase,
  useCreateCategoryUsecase,
  useCreateUserUsecase,
  useDeleteCategoryUsecase,
  useFetchCategoriesUsecase,
  useListCategoriesUsecase,
  useListEquipmentsUsecase,
  useListTicketsUsecase,
  useListUsersUsecase,
  useNotifier,
  useShowCategoryUsecase,
  useUpdateCategoryUsecase
} from './factories'

provide(PROVIDERS.AUTHENTICATE_USECASE, useAuthenticateUsecase())
provide(PROVIDERS.CREATE_CATEGORY_USECASE, useCreateCategoryUsecase())
provide(PROVIDERS.CREATE_USER_USECASE, useCreateUserUsecase())
provide(PROVIDERS.DELETE_CATEGORY_USECASE, useDeleteCategoryUsecase())
provide(PROVIDERS.FETCH_CATEGORIES_USECASE, useFetchCategoriesUsecase())
provide(PROVIDERS.LIST_CATEGORIES_USECASE, useListCategoriesUsecase())
provide(PROVIDERS.LIST_EQUIPMENTS_USECASE, useListEquipmentsUsecase())
provide(PROVIDERS.LIST_TICKETS_USECASE, useListTicketsUsecase())
provide(PROVIDERS.LIST_USERS_USECASE, useListUsersUsecase())
provide(PROVIDERS.SHOW_CATEGORY_USECASE, useShowCategoryUsecase())
provide(PROVIDERS.UPDATE_CATEGORY_USECASE, useUpdateCategoryUsecase())
provide(PROVIDERS.NOTIFIER, useNotifier())
</script>

<template>
  <router-view />
</template>
