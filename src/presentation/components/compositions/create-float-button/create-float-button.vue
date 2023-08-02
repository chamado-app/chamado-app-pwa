<template>
  <transition
    appear
    enter-active-class="animated slideInUp"
    leave-active-class="animated fadeOutDown">
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn :to="{ name: 'create-ticket' }" fab icon="mdi-plus" color="accent">
        <q-tooltip
          class="background-dark text-mantle"
          anchor="top middle"
          self="center middle"
          :offset="[20, 20]">
          Criar Chamado
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
  </transition>
</template>
