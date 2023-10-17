<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const ticketId = computed(() => route.params.id)
</script>

<template>
  <div>Informações do ticket {{ ticketId }}</div>
</template>
