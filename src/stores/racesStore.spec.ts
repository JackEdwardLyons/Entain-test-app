import { describe, it, beforeEach, expect } from 'vitest'
import { useRacesStore } from './racesStore'
import { setActivePinia, createPinia } from 'pinia'
import type { IRaceSummary } from '@/types/race-summary'

describe('racesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('filters races by selected categories', () => {
    const store = useRacesStore()

    store.setCategorySelected('1', true)
    expect(store.selectedCategoryIds.has('1')).toBe(true)
    expect(store.selectedCategoryIds.has('2')).toBe(false)

    store.setCategorySelected('2', true)
    expect(store.selectedCategoryIds.has('2')).toBe(true)
  })

  it('sorts races by start time ascending', () => {
    const store = useRacesStore()

    // Mock race data with different start times
    const mockRaces = [
      {
        race_id: '1',
        category_id: 'greyhound',
        advertised_start: { seconds: 1000 },
        meeting_name: 'Test Meeting',
        race_number: 1,
        race_form: { distance: 500, distance_type: { short_name: 'm' } },
      },
      {
        race_id: '2',
        category_id: 'greyhound',
        advertised_start: { seconds: 500 },
        meeting_name: 'Test Meeting',
        race_number: 2,
        race_form: { distance: 500, distance_type: { short_name: 'm' } },
      },
    ]

    store.upsertRaces(mockRaces as IRaceSummary[])
    // Should be sorted by start time (earliest first)
    expect(store.upcomingSorted[0]?.race_id).toBe('2')
    expect(store.upcomingSorted[1]?.race_id).toBe('1')
  })

  it('removes races when marked as ended', () => {
    const store = useRacesStore()

    const mockRace: IRaceSummary = {
      race_id: 'test-race',
      category_id: 'greyhound',
      advertised_start: { seconds: 1000 },
      meeting_name: 'Test Meeting',
      race_number: 1,
      race_form: { distance: 500, distance_type: { short_name: 'm' } },
    } as IRaceSummary

    store.upsertRaces([mockRace])
    expect(store.allRaces.has('test-race')).toBe(true)

    store.markRaceEnded('test-race')
    expect(store.allRaces.has('test-race')).toBe(false)
  })
})
