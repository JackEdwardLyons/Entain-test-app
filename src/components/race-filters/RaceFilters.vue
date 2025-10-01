<script setup lang="ts">
import { categoryNameDictionary } from '@/utils/constants'
import type { CategoryKeyType } from '@/utils/constants'
import { useRacesStore } from '@/stores/racesStore'

const store = useRacesStore()

/**
 * Handle checkbox change events for category filtering
 *
 * When a user toggles a category checkbox, this function updates the store
 * to show/hide races from the selected categories. Multiple categories can
 * be selected simultaneously.
 *
 * @param e - The checkbox change event
 */
function onFilterSelect(e: Event) {
  const target = e.target as HTMLInputElement
  store.setCategorySelected(target.value as CategoryKeyType, target.checked)
}
</script>

<template>
  <div>
    <h3>Filter by Category</h3>

    <div class="filter-category-list">
      <wa-checkbox
        size="large"
        v-for="key in store.categoryKeys"
        :key="key"
        :value="key"
        :checked.prop="store.selectedCategoryIds.has(key)"
        @change="onFilterSelect"
      >
        {{ categoryNameDictionary[key] }}
      </wa-checkbox>
    </div>
  </div>
</template>

<style scoped lang="scss">
.filter-category-list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
}
</style>
