<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const titles = {
  'in-progress': 'Chamados em andamento',
  completed: 'Chamados concluídos',
  all: 'Todos os chamados'
}

const title = computed(() => titles[route.params.taskStatus as string])
</script>

<template>
  <h2 class="text-h6">{{ title }}</h2>
</template>
