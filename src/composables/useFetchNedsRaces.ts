import { useQuery } from '@tanstack/vue-query'

/**
 * Composable for fetching race data from the Neds API via proxy
 *
 * This composable handles the API call to retrieve upcoming races and provides
 * reactive data management through Vue Query. It fetches a configurable number
 * of races to ensure we have enough data for filtering by category.
 *
 * Uses a Vercel serverless function to proxy requests and bypass CORS restrictions.
 *
 * @param count - Number of races to fetch from the API (default: 50)
 * @returns Vue Query object with race data, loading state, and error handling
 */
export default function useFetchNedsRaces(count = 50) {
  // Use the Vercel API route instead of direct Neds API call
  const endpoint = '/api/races'

  return useQuery({
    queryKey: ['races'],
    queryFn: async () => {
      const response = await fetch(`${endpoint}?count=${count}`)
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

    // Refetch every 30 seconds to keep data fresh
    refetchInterval: 30000,
  })
}
