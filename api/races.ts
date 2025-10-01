import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * Vercel serverless function to proxy Neds API calls
 *
 * This function acts as a proxy between the frontend and the Neds API
 * to bypass CORS restrictions. It forwards requests to the Neds API
 * and returns the response to the frontend.
 *
 * @param req - Vercel request object
 * @param res - Vercel response object
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const count = req.query.count || '50'
    const apiUrl = `${process.env.VITE_NEDS_API_URL}&count=${count}`

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'User-Agent': 'NextToGoRaces/1.0',
      },
    })

    if (!response.ok) {
      throw new Error(`Neds API responded with status: ${response.status}`)
    }

    const data = await response.json()

    // Set CORS headers to allow frontend access
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Cache-Control', 'public, max-age=30') // Cache for 30 seconds

    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching race data:', error)

    // Set CORS headers even for error responses
    res.setHeader('Access-Control-Allow-Origin', '*')

    // Return error response
    res.status(500).json({
      error: 'Failed to fetch race data',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
