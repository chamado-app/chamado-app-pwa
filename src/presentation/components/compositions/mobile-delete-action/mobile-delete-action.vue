<script lang="ts" setup>
import { DeleteAction } from '@/presentation/components'

export type MobileDeleteRegisterProps = {
  deleteHandler: () => Promise<void>
}

defineProps<MobileDeleteRegisterProps>()
</script>

<template>
  <DeleteAction :delete-handler="deleteHandler">
    <template #handler="{ onOpen }">
      <q-btn
        no-caps
        class="mobile-delete-action"
        flat
        color="negative"
        @click.stop="onOpen">
        Excluir
      </q-btn>
    </template>
  </DeleteAction>
</template>

<style lang="scss" scoped>
.mobile-delete-action {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
}
</style>
