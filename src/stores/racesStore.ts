import type { IRaceSummary } from '@/types/race-summary'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { MAX_RACES_TO_SHOW, categoryNameDictionary, type CategoryKeyType } from '@/utils/constants'

/**
 * Pinia store for managing race data and filtering state
 *
 * This store handles all race-related state including:
 * - Storing fetched race data
 * - Managing category filter selections
 * - Sorting and filtering races for display
 * - Removing races when they expire
 */
export const useRacesStore = defineStore('raceData', () => {
  // Map to store all races by their unique race ID for efficient lookups
  const allRaces = ref(new Map<string, IRaceSummary>())
  // Set of selected category IDs for filtering races
  const selectedCategoryIds = ref<Set<string>>(new Set())

  /**
   * Toggle category selection for filtering
   *
   * Adds or removes a category ID from the selected categories set.
   * When categories are selected, only races from those categories will be shown.
   *
   * @param id - The category ID to toggle
   * @param enabled - Whether the category should be selected or deselected
   */
  function setCategorySelected(id: string, enabled: boolean) {
    const next = new Set(selectedCategoryIds.value)
    if (enabled) {
      next.add(id)
    } else {
      next.delete(id)
    }
    selectedCategoryIds.value = next
  }

  /**
   * Add or update races in the store
   *
   * This function handles both new races and updates to existing races.
   * It handles both arrays and objects and stores races by their unique
   * race ID for efficient management.
   *
   * @param races - Array or object of race summaries to add/update
   */
  function upsertRaces(races: IRaceSummary[] | Record<string, IRaceSummary>) {
    if (!races) return

    // Normalise input to array format
    const list: IRaceSummary[] = Array.isArray(races) ? races : Object.values(races)

    // Add each race to the store, skipping invalid entries
    for (const race of list) {
      if (!race || !race.race_id) continue
      allRaces.value.set(race.race_id, race)
    }
  }

  /**
   * Remove a race from the store when it expires
   *
   * Called when a race has passed its grace period and
   * should no longer be displayed to users.
   *
   * @param id - The race ID to remove
   */
  function markRaceEnded(id: string) {
    allRaces.value.delete(id)
  }

  /**
   * Computed property for sorted and filtered races
   *
   * This computed property handles the core business logic:
   * 1. Gets all races from the store
   * 2. Filters by selected categories (if any are selected)
   * 3. Sorts by advertised start time (ascending - earliest first)
   *
   * @returns Array of race summaries sorted by start time
   */
  const upcomingSorted = computed<IRaceSummary[]>(() => {
    const list = Array.from(allRaces.value.values())

    // Apply category filtering if categories are selected
    const selected = selectedCategoryIds.value
    const filtered = selected.size ? list.filter((r) => r && selected.has(r.category_id)) : list

    // Sort by start time (earliest races first)
    return filtered
      .filter(Boolean)
      .sort((a, b) => a.advertised_start.seconds - b.advertised_start.seconds)
  })

  /**
   * Computed property for visible races (limited to max count)
   *
   * Takes the sorted and filtered races and limits them to the maximum
   * number of races that should be displayed (5 races as per requirements).
   *
   * @returns Array of race summaries limited to MAX_RACES_TO_SHOW
   */
  const visibleRaces = computed<IRaceSummary[]>(() => {
    return upcomingSorted.value.slice(0, MAX_RACES_TO_SHOW)
  })

  /**
   * Computed property for available category keys
   *
   * Provides the list of category IDs that can be used for filtering.
   * Used by the filter component to generate checkboxes.
   *
   * @returns Array of category key strings
   */
  const categoryKeys = computed(() => Object.keys(categoryNameDictionary) as CategoryKeyType[])

  return {
    selectedCategoryIds,
    setCategorySelected,
    upsertRaces,
    markRaceEnded,
    upcomingSorted,
    visibleRaces,
    allRaces,
    categoryKeys,
  }
})
