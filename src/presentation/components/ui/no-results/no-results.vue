<template>
  <div class="text-body no-results__wrapper">
    <q-icon name="mdi-database-search" size="5rem" />
    <div class="text-center">
      <p class="no-margin text-h6">A busca não retornou resultados.</p>
      <p class="text-subtitle1">
        Por favor, verifique se os dados inseridos estão corretos e tente
        novamente
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.no-results {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 4rem 1rem;

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
