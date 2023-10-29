<script lang="ts" setup>
export type NoRegistersProps = {
  title?: string
  message?: string
  buttonLabel?: string
  formPath: string
}

withDefaults(defineProps<NoRegistersProps>(), {
  title: 'Não há registros disponíveis no momento.',
  message: 'Considere criar um novo registro.',
  buttonLabel: 'Criar novo registro'
})
</script>

<template>
  <div class="text-body no-registers__wrapper">
    <q-icon name="mdi-database-alert" size="6rem" />
    <div class="text-center">
      <p class="no-margin text-h6">{{ title }}</p>
      <p class="text-subtitle1">{{ message }}</p>
    </div>
    <q-btn
      v-if="formPath"
      :to="{ name: formPath }"
      :label="buttonLabel"
      color="primary"
      no-caps />
  </div>
</template>

<style lang="scss" scoped>
.no-registers {
  &__wrapper {
    height: calc(100vh - 10rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;

    @media screen and (max-width: $breakpoint-sm-max) {
      .text-h6 {
        font-size: 1rem;
      }

      .text-subtitle1 {
        font-size: 0.875rem;
      }
    }
  }
}
</style>
