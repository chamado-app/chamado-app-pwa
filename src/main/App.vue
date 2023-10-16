<script lang="ts" setup>
import { provide } from 'vue'

import { PROVIDERS } from '@/presentation/providers'

import {
  useAuthenticateUsecase,
  useListTicketsUsecase,
  useNotifier
} from './factories'

provide(PROVIDERS.AUTHENTICATE_USECASE, useAuthenticateUsecase())
provide(PROVIDERS.LIST_TICKETS_USECASE, useListTicketsUsecase())
provide(PROVIDERS.NOTIFIER, useNotifier())
</script>

<template>
  <router-view />
</template>
