import { useQuery } from '@tanstack/vue-query'

/**
 * Composable for fetching race data from the Neds API
 *
 * This composable handles the API call to retrieve upcoming races and provides
 * reactive data management through Vue Query. It fetches a configurable number
 * of races to ensure we have enough data for filtering by category.
 *
 * @param count - Number of races to fetch from the API (default: 50)
 * @returns Vue Query object with race data, loading state, and error handling
 */
export default function useFetchNedsRaces(count = 50) {
  // Get the API endpoint from environment variables
  const endpoint = import.meta.env.VITE_NEDS_API_URL

  return useQuery({
    queryKey: ['races'],
    queryFn: async () => {
      const response = await fetch(`${endpoint}&count=${count}`)
      const data = await response.json()
      return data
    },

    // Transform the API response to extract just the race summaries
    // The API can return either an array or object, so we normalise it
    select: (d: any) => {
      return d?.data?.race_summaries ?? {}
    },

    // Provide empty object as placeholder to avoid undefined during initial load
    placeholderData: () => ({}),
  })
}
