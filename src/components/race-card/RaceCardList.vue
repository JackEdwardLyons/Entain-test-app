<script setup lang="ts">
import RaceCard from '@/components/race-card/RaceCard.vue'
import type { IRaceSummary } from '@/types/race-summary'
import { TransitionGroup } from 'vue'

const props = defineProps<{
  raceSummaries: IRaceSummary[]
}>()
</script>

<template>
  <TransitionGroup name="race-card-list">
    <div v-for="race in raceSummaries" :key="race.race_id" class="race-card-list">
      <RaceCard :race="race" />
    </div>
  </TransitionGroup>
</template>

<style scoped lang="scss">
.race-card-list-enter-active,
.race-card-list-leave-active {
  transition: all 0.5s ease;
}
.race-card-list-enter-from,
.race-card-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.race-card-list {
  margin: 1rem 0;
}
</style>
