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
    color: #ffffff;
    width: 12rem;
    max-width: calc(100vw - 9.5rem);
    transition: all 250ms cubic-bezier(1, 0, 0, 1);

    &:focus {
      color: $text;
      width: 20rem;
    }

    &-wrapper {
      background-color: rgba($background, 0.25);
      border-radius: 0.25rem;
      padding: 0 1rem;
      transition: all 250ms cubic-bezier(1, 0, 0, 1);

      &:focus-within {
        background: $background;
      }
    }
  }
}
</style>
