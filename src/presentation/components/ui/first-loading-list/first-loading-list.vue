<template>
  <div class="text-body no-results__wrapper">
    <q-spinner :thickness="3" size="4rem" />
    <p class="no-margin text-subtitle2">Buscando dados...</p>
  </div>
</template>

<style lang="scss" scoped>
.no-results {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 4rem 1rem;

    @media screen and (max-width: $breakpoint-sm-max) {
      .text-subtitle2 {
        font-size: 0.875rem;
      }
    }
  }
}
</style>
