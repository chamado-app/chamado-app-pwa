<script lang="ts" setup>
export type CreateFloatButtonProps = {
  formPath: string
  label: string
}

defineProps<CreateFloatButtonProps>()
</script>
<template>
  <transition
    appear
    enter-active-class="animated slideInUp"
    leave-active-class="animated fadeOutDown">
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn :to="{ name: formPath }" fab icon="mdi-plus" color="secondary">
        <q-tooltip
          class="bg-secondary text-mantle"
          anchor="center left"
          self="center right"
          transition-show="scale"
          transition-hide="scale">
          {{ label }}
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
  </transition>
</template>
