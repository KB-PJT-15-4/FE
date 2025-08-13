import axios from 'axios'
import type { FetchTripsParams, TripsResponse } from '@/entities/record/record.entity'

export const ITEMS_PER_PAGE = 3

/** 여행 목록 API 호출 */
export async function fetchTripsService(params: FetchTripsParams): Promise<TripsResponse> {
  const { token, apiBaseUrl, pageIndex, pageSize, locationName } = params
  if (!token) throw new Error('Access token not found')

  const response = await axios.get(`${apiBaseUrl}/api/trips`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: pageIndex,
      size: pageSize,
      locationName,
    },
  })

  const { content, totalPages } = response.data.data
  return { content, totalPages }
}
