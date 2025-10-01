import { GRACE_VISIBILITY_PERIOD_IN_SECONDS } from '@/utils/constants'
import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Composable for managing race countdown timers
 *
 * This composable provides a reactive countdown timer that displays the time
 * remaining until a race starts. Once the race has started, it shows 'Race Started'
 * and schedules the race removal after the grace period (1 minute after start time).
 *
 * The timer updates every second and automatically cleans up when the component
 * is unmounted to prevent memory leaks.
 *
 * @param raceStart - The race start time in Unix seconds
 * @param raceEndCallback - Optional callback function to execute when race should be removed
 * @returns Reactive reference containing the formatted countdown string
 */
export default function useTimeUntilStart(raceStart: number, raceEndCallback?: Function) {
  // Return early if no valid start time provided
  if (!raceStart) return 'Start time unavailable.'

  const timeUntilStart = ref('')
  let intervalId: ReturnType<typeof setInterval> | null = null

  /**
   * Updates the countdown display based on current time
   *
   * Calculates the difference between race start time and current time,
   * formats it appropriately, and handles race completion logic.
   */
  const updateCountdown = () => {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000)
    const timeDiff = raceStart - currentTimeInSeconds

    if (timeDiff <= 0) {
      timeUntilStart.value = 'Race Started'
      // Schedule race removal after grace period
      if (raceEndCallback) {
        setTimeout(() => {
          raceEndCallback()
        }, GRACE_VISIBILITY_PERIOD_IN_SECONDS * 1000)
      }

      if (intervalId) {
        clearInterval(intervalId)
      }

      return
    }

    // Calculate time components for display
    const hours = Math.floor(timeDiff / 3600)
    const minutes = Math.floor((timeDiff % 3600) / 60)
    const seconds = timeDiff % 60

    // Format countdown based on remaining time
    if (hours > 0) {
      timeUntilStart.value = `${hours}h ${minutes}m ${seconds}s`
    } else if (minutes > 0) {
      timeUntilStart.value = `${minutes}m ${seconds}s`
    } else {
      timeUntilStart.value = `${seconds}s`
    }
  }

  onMounted(() => {
    updateCountdown()
    intervalId = setInterval(updateCountdown, 1000)
  })

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })

  return timeUntilStart
}
