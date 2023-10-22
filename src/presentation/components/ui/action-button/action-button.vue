<script lang="ts" setup>
export type ActionButtonProps = {
  tooltip?: string
  icon: string
}

defineProps<ActionButtonProps>()
defineEmits(['click'])
</script>

<template>
  <q-btn
    :icon="icon"
    color="white"
    dense
    flat
    type="button"
    rounded
    @click.prevent.stop="() => $emit('click')">
    <q-tooltip v-if="tooltip" anchor="top middle" self="bottom middle">
      {{ tooltip }}
    </q-tooltip>
  </q-btn>
</template>
