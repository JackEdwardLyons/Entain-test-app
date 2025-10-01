<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  timeUntilStart: string
}>()

/**
 * Computed property to determine badge colour based on time remaining
 *
 * Provides visual feedback to users about how urgent the race start is:
 * - Green (success): More than 1 minute remaining
 * - Yellow (warning): 30 seconds to 1 minute remaining
 * - Red (danger): Less than 30 seconds remaining
 *
 * @returns Badge variant string for styling
 */
const badgeVariant = computed(() => {
  // Extract minutes and seconds from time string like "2m 14s"
  const minutes = parseInt(props.timeUntilStart.match(/(\d+)m/)?.[1] || '0')
  const seconds = parseInt(props.timeUntilStart.match(/(\d+)s/)?.[1] || '0')
  const totalSeconds = minutes * 60 + seconds

  if (totalSeconds > 60) return 'success' // Green - plenty of time
  if (totalSeconds > 30) return 'warning' // Yellow - getting close

  return 'danger' // Red - very close to start
})
</script>

<template>
  <div class="race-countdown">
    <wa-badge :variant="badgeVariant" attention="pulse" pill>{{ timeUntilStart }}</wa-badge>
  </div>
</template>

<style scoped lang="scss">
.race-countdown {
  font-size: 1.5rem;
}
</style>
