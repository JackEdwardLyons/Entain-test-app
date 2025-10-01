<script setup lang="ts">
import type { IRaceSummary } from '@/types/race-summary'
import useTimeUntilStart from '@/composables/useTimeUntilStart'
import { useRacesStore } from '@/stores/racesStore'
import RaceCountdown from '@/components/race-countdown/RaceCountdown.vue'
import harnessIcon from '@/assets/harness-icon.svg'
import horseIcon from '@/assets/horse-icon.svg'
import greyhoundIcon from '@/assets/greyhound-icon.svg'
import { computed } from 'vue'
import { categoryNameDictionary, type CategoryKeyType } from '@/utils/constants'

const store = useRacesStore()

const props = defineProps<{
  race: IRaceSummary
}>()

/**
 * Remove race card from the store when race expires
 *
 * This function is called by the countdown timer when a race has
 * passed its grace period and should be removed from the display.
 */
function removeRaceCard() {
  store.markRaceEnded(props.race.race_id)
}

/**
 * Computed property to determine the appropriate icon for the race category
 *
 * Maps the race's category ID to the corresponding SVG icon asset.
 * Provides visual representation of the race type (Greyhound, Harness, or Horse).
 *
 * @returns The SVG icon path or null if category is unknown
 */
const categoryIcon = computed(() => {
  const categoryId = props.race.category_id as CategoryKeyType
  const category = categoryNameDictionary[categoryId]

  // Return the appropriate icon based on category name
  switch (category?.toLowerCase()) {
    case 'harness':
      return harnessIcon
    case 'horses':
      return horseIcon
    case 'greyhound':
      return greyhoundIcon
    default:
      console.warn(`Unknown category: ${category} for category_id: ${categoryId}`)
      return null
  }
})

const timeUntilStart = useTimeUntilStart(props.race.advertised_start.seconds, removeRaceCard)
</script>

<template>
  <wa-card orientation="horizontal" class="wa-split">
    <div class="card-content">
      <img
        v-if="categoryIcon"
        class="card-category-icon"
        :src="categoryIcon"
        :alt="`${categoryIcon} icon`"
        width="40"
        height="40"
      />

      <h5 class="card-title">{{ race.meeting_name }} - Race {{ race.race_number }}</h5>

      <p class="card-subtitle" slot="actions">
        Distance: {{ race.race_form.distance }}{{ race.race_form.distance_type.short_name }}
      </p>
    </div>

    <RaceCountdown slot="actions" :timeUntilStart="timeUntilStart" />
  </wa-card>
</template>

<style scoped lang="scss">
.card-content {
  max-width: 20rem;
  display: flex;
  flex-direction: column;
}

.card-category-icon {
  margin: 0 0 0.5rem;
  width: 40px;
  height: 40px;
}

.card-title,
.card-subtitle {
  margin: 0;
  padding: 0;
  text-align: left;
}
</style>
