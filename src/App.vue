<script setup lang="ts">
import RaceCardContainer from '@/components/race-card-container/RaceCardContainer.vue'
</script>

<template>
  <main class="main-container">
    <h1 class="main-container__title">Next To Go Races</h1>

    <RaceCardContainer />
  </main>
</template>

<style scoped lang="scss">
.main-container {
  width: 100%;
  max-width: 48rem;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;

  &__title {
    text-align: center;
    margin: 2rem auto;
    text-decoration: underline;
  }
}
</style>
