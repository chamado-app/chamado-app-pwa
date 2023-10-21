<script lang="ts" setup>
export type ActionButtonProps = {
  tooltip: string
  icon: string
}

defineProps<ActionButtonProps>()
defineEmits(['click'])
</script>

<template>
  <q-btn
    :icon="icon"
    color="secondary"
    dense
    flat
    rounded
    @click="() => $emit('click')">
    <q-tooltip anchor="top middle" self="bottom middle">
      {{ tooltip }}
    </q-tooltip>
  </q-btn>
</template>
