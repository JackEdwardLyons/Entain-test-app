<script setup lang="ts">
import { watchEffect, ref } from 'vue'
import RaceFilters from '@/components/race-filters/RaceFilters.vue'
import RaceCardList from '@/components/race-card/RaceCardList.vue'
import { useRacesStore } from '@/stores/racesStore'
import useFetchNedsRaces from '@/composables/useFetchNedsRaces'

const store = useRacesStore()
const { data: racesData, isLoading, error } = useFetchNedsRaces()

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

  <RaceFilters v-if="!isLoading" />

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
