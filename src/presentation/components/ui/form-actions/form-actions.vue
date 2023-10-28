<script lang="ts" setup>
defineEmits<{ onCancel: [] }>()
</script>

<template>
  <div class="text-body form-actions">
    <q-btn flat no-caps @click.stop="() => $emit('onCancel')"> Cancelar </q-btn>
    <q-btn type="submit" color="primary" no-caps>Salvar</q-btn>
  </div>
</template>

<style lang="scss" scoped>
.form-actions {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: max-content;
  grid-auto-rows: max-content;
  gap: 1rem;
  justify-content: end;
  align-items: center;
  margin-top: 1.5rem;
  width: 100%;
}
</style>
