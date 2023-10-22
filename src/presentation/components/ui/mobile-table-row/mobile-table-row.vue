<script setup lang="ts">
type Column = {
  label: string
  name: string
  value: any
}

export type MobileTableRowProps = {
  columns: Column[]
  id: string
  route: string
}

defineProps<MobileTableRowProps>()
</script>

<template>
  <div class="mobile-table-row__wrapper col-xs-12 col-sm-6">
    <router-link
      :to="{ name: route, params: { id } }"
      class="mobile-table-row__link">
      <q-card v-ripple:secondary bordered flat class="mobile-table-row__item">
        <q-list dense class="mobile-table-row__content">
          <template v-for="col in columns" :key="col.name">
            <slot :name="`list-item-${col.name}`" :column="col">
              <q-item class="mobile-table-row__list-item">
                <q-item-section>
                  <slot
                    :name="`list-item-label-${col.name}`"
                    :label="col.label">
                    <q-item-label class="text-weight-bold">
                      {{ col.label }}
                    </q-item-label>
                  </slot>
                </q-item-section>
                <q-item-section side>
                  <slot
                    :name="`list-item-value-${col.name}`"
                    :value="col.value">
                    <q-item-label caption>
                      {{ col.value }}
                    </q-item-label>
                  </slot>
                </q-item-section>
              </q-item>
            </slot>
          </template>
        </q-list>
      </q-card>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.mobile-table-row {
  &__wrapper {
    padding: 0.25rem;
  }

  &__link {
    text-decoration: none;
    color: $text;
  }

  &__item {
    padding: 0.25rem 0.75rem;
  }

  &__content,
  &__list-item {
    padding: 0 !important;
  }
}
</style>
