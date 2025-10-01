<script setup lang="ts">
import { watchEffect } from 'vue'
import RaceFilters from '@/components/race-filters/RaceFilters.vue'
import RaceCardList from '@/components/race-card/RaceCardList.vue'
import { useRacesStore } from '@/stores/racesStore'
import useFetchNedsRaces from '@/composables/useFetchNedsRaces'

const store = useRacesStore()
const { data: racesData, isLoading, error } = useFetchNedsRaces()

/**
 * Watch for changes in race data and update the store
 *
 * This effect automatically updates the store whenever new race data
 * is fetched from the API, ensuring the UI stays in sync with the latest data.
 */
watchEffect(() => {
  if (racesData.value) {
    store.upsertRaces(racesData.value)
  }
})
</script>

<template>
  <div class="loading-container" v-if="isLoading">
    <h2>Loading races...</h2>
    <progress style="font-size: 16rem"></progress>
  </div>

  <div v-if="error">Error: {{ error.message }}</div>

  <RaceFilters />

  <hr />

  <RaceCardList
    v-if="!isLoading && store.visibleRaces.length > 0"
    :race-summaries="store.visibleRaces"
  />
</template>

<style scoped lang="scss">
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
}
</style>
