<script setup lang="ts">
import { TableActions } from '@/presentation/components'

type Column = {
  label: string
  name: string
  value: any
}

export type DesktopRowProps = {
  columns: Column[]
  id: string
  route: string
  deleteHandler?: () => Promise<void>
}

defineProps<DesktopRowProps>()
defineEmits(['onDeleted'])
</script>

<template>
  <q-tr class="table-row__item">
    <template v-for="col in columns" :key="col.name">
      <slot :name="`list-item-${col.name}`" :column="col">
        <q-td>
          {{ col.value }}
        </q-td>
      </slot>
    </template>
    <router-link
      v-ripple:secondary
      :to="{ name: route, params: { id } }"
      class="table-row__actions">
      <TableActions
        :delete-handler="deleteHandler"
        @on-deleted="() => $emit('onDeleted')" />
    </router-link>
  </q-tr>
</template>

<style lang="scss" scoped>
.table-row {
  &__item {
    position: relative;
    z-index: 0;
  }

  &__actions,
  &__actions * {
    text-decoration: none !important;
  }

  &__actions {
    z-index: 1;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    transition: all 0.3s;
    cursor: pointer;
    overflow: hidden;

    > * {
      transition: all 0.3s;
      transform-origin: right;
      transform: scale(0);
    }

    &::before {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 0%;
      height: 100%;
      transition: all 0.3s;
      background-image: linear-gradient(
        to right,
        transparent,
        rgba($secondary, 0.6),
        $secondary
      );
    }
  }

  &__item:hover &__actions {
    > * {
      transform: scale(1);
    }

    &::before {
      width: 16rem;
      max-width: 100%;
    }
  }
}
</style>
