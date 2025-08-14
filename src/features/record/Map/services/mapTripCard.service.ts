import type { FetchTripsParams, TripsResponse } from '@/entities/record/record.entity'
import { API_END_POINT } from '@/shared/utils/fetcher'

export const ITEMS_PER_PAGE = 3

// 여행 목록 API (fetch 사용)
export async function fetchTripsService(params: FetchTripsParams): Promise<TripsResponse> {
  const { token, pageIndex, pageSize, locationName } = params
  if (!token) throw new Error('Access token not found')

  const { url, method } = API_END_POINT.map.getTrips(pageIndex, pageSize, locationName ?? undefined)

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}))
    throw new Error(errorBody?.message ?? 'Failed to fetch trips')
  }

  const json = await res.json()
  const { content, totalPages } = json.data
  return { content, totalPages }
}

