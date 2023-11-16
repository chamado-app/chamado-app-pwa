<script lang="ts" setup>
import { onMounted } from 'vue'

const emit = defineEmits<{ onMounted: [] }>()

onMounted(() => {
  emit('onMounted')
})
</script>

<template>
  <div id="header-page-title"></div>
</template>
