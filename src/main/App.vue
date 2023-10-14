<script lang="ts" setup>
import { provide } from 'vue'

import { PROVIDERS } from '@/presentation/providers'

import {
  useListTicketsUsecase,
  useLoginUsecase,
  useNotifier
} from './factories'

provide(PROVIDERS.LOGIN_USECASE, useLoginUsecase())
provide(PROVIDERS.LIST_TICKETS_USECASE, useListTicketsUsecase())
provide(PROVIDERS.NOTIFIER, useNotifier())
</script>

<template>
  <router-view />
</template>
