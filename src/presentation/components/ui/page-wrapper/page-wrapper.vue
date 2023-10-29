<script lang="ts" setup>
import { PageTitle } from '@/presentation/components'

export type PageWrapperProps = {
  title: string
  isModal?: boolean
}

defineProps<PageWrapperProps>()
</script>

<template>
  <div
    class="page-wrapper__header"
    :class="{ 'page-wrapper__header-modal': isModal }">
    <PageTitle
      :class="{ 'page-wrapper__modal-title': isModal }"
      :title="title" />
    <slot name="title-append" />
  </div>
  <slot />
</template>

<style scoped lang="scss">
.page-wrapper {
  &__modal-title {
    font-size: 0.875rem !important;

    @media screen and (min-width: $breakpoint-md-min) {
      font-size: 1rem !important;
    }
  }

  &__header {
    display: grid;
    grid-template-columns: 100%;
    height: 2rem;
    align-items: center;

    &-modal {
      grid-template-columns: auto 2rem;
      gap: 1.5rem;
    }
  }
}
</style>
