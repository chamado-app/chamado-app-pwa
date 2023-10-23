<template>
  <div class="global-search__wrapper">
    <q-input
      class="global-search__input-wrapper"
      input-class="global-search__input"
      borderless
      dense
      model-value=""
      placeholder="Pesquisar" />
  </div>
</template>

<style lang="scss">
.global-search {
  &__wrapper {
    position: relative;
  }

  &__input {
    width: 13.1rem;
    max-width: calc(100vw - 9.5rem);
    transition: all 250ms cubic-bezier(1, 0, 0, 1);

    &:focus {
      width: 20rem;
    }

    &-wrapper {
      border-radius: 0.25rem;
      padding: 0 1rem;
      transition: all 250ms cubic-bezier(1, 0, 0, 1);
    }
  }
}
</style>
