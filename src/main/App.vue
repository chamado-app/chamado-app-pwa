<script lang="ts" setup>
import { provide } from 'vue'

import { PROVIDERS } from '@/presentation/providers'

import {
  useAuthenticateUsecase,
  useCancelTicketUsecase,
  useChangeTicketAssignedUsecase,
  useChangeTicketStatusUsecase,
  useCompleteTicketUsecase,
  useCreateCategoryUsecase,
  useCreateEquipmentUsecase,
  useCreateTicketUsecase,
  useCreateUserUsecase,
  useDeleteCategoryUsecase,
  useDeleteEquipmentUsecase,
  useDeleteUserUsecase,
  useFetchCategoriesUsecase,
  useFetchEquipmentsUsecase,
  useFetchUsersUsecase,
  useListCategoriesUsecase,
  useListEquipmentsUsecase,
  useListTicketsUsecase,
  useListUsersUsecase,
  useLogoutUsecase,
  useNotifier,
  useSendTicketTextMessageUsecase,
  useShowCategoryUsecase,
  useShowEquipmentUsecase,
  useShowTicketUsecase,
  useShowUserUsecase,
  useUpdateCategoryUsecase,
  useUpdateEquipmentUsecase,
  useUpdateUserUsecase
} from './factories'

provide(PROVIDERS.AUTHENTICATE_USECASE, useAuthenticateUsecase())
provide(PROVIDERS.LOGOUT_USECASE, useLogoutUsecase())
provide(PROVIDERS.CANCEL_TICKET_USECASE, useCancelTicketUsecase())
provide(PROVIDERS.CREATE_CATEGORY_USECASE, useCreateCategoryUsecase())
provide(PROVIDERS.CREATE_EQUIPMENT_USECASE, useCreateEquipmentUsecase())
provide(PROVIDERS.CREATE_TICKET_USECASE, useCreateTicketUsecase())
provide(PROVIDERS.CREATE_USER_USECASE, useCreateUserUsecase())
provide(PROVIDERS.DELETE_CATEGORY_USECASE, useDeleteCategoryUsecase())
provide(PROVIDERS.DELETE_EQUIPMENT_USECASE, useDeleteEquipmentUsecase())
provide(PROVIDERS.DELETE_USER_USECASE, useDeleteUserUsecase())
provide(PROVIDERS.FETCH_CATEGORIES_USECASE, useFetchCategoriesUsecase())
provide(PROVIDERS.FETCH_EQUIPMENTS_USECASE, useFetchEquipmentsUsecase())
provide(PROVIDERS.FETCH_USERS_USECASE, useFetchUsersUsecase())
provide(PROVIDERS.LIST_CATEGORIES_USECASE, useListCategoriesUsecase())
provide(PROVIDERS.LIST_EQUIPMENTS_USECASE, useListEquipmentsUsecase())
provide(PROVIDERS.LIST_TICKETS_USECASE, useListTicketsUsecase())
provide(PROVIDERS.LIST_USERS_USECASE, useListUsersUsecase())
provide(PROVIDERS.SHOW_CATEGORY_USECASE, useShowCategoryUsecase())
provide(PROVIDERS.SHOW_EQUIPMENT_USECASE, useShowEquipmentUsecase())
provide(PROVIDERS.SHOW_TICKET_USECASE, useShowTicketUsecase())
provide(PROVIDERS.SHOW_USER_USECASE, useShowUserUsecase())
provide(PROVIDERS.UPDATE_CATEGORY_USECASE, useUpdateCategoryUsecase())
provide(PROVIDERS.UPDATE_EQUIPMENT_USECASE, useUpdateEquipmentUsecase())
provide(PROVIDERS.UPDATE_USER_USECASE, useUpdateUserUsecase())
provide(PROVIDERS.COMPLETE_TICKET_USECASE, useCompleteTicketUsecase())
provide(PROVIDERS.CHANGE_TICKET_STATUS_USECASE, useChangeTicketStatusUsecase())
provide(
  PROVIDERS.CHANGE_TICKET_ASSIGNED_USECASE,
  useChangeTicketAssignedUsecase()
)

provide(
  PROVIDERS.SEND_TICKET_TEXT_MESSAGE_USECASE,
  useSendTicketTextMessageUsecase()
)

provide(PROVIDERS.NOTIFIER, useNotifier())
</script>

<template>
  <router-view />
</template>
