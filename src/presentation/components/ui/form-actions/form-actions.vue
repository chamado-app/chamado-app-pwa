<script lang="ts" setup>
defineEmits<{ onCancel: [] }>()
</script>

<template>
  <div class="form-actions">
    <q-btn flat color="negative" no-caps @click.stop="() => $emit('onCancel')">
      Cancelar
    </q-btn>
    <q-btn color="primary" type="submit" no-caps>Salvar</q-btn>
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
  margin-top: 1rem;
}
</style>
