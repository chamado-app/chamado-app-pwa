<script lang="ts" setup>
import { provide } from 'vue'

import {
  useListTicketsUsecase,
  useLoginUsecase,
  useNotifier,
  useWhoAmIUsecase
} from './factories'

provide('loginUsecase', useLoginUsecase())
provide('listTicketsUsecase', useListTicketsUsecase())
provide('whoAmIUsecase', useWhoAmIUsecase())
provide('notifier', useNotifier())
</script>

<template>
  <router-view />
</template>
