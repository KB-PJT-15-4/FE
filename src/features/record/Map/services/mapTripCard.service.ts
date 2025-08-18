import type { Trip } from '@/entities/record/record.entity'
import { api } from '@/shared/utils/api'
import { API_END_POINT, type ApiData, type Paged } from '@/shared/utils/fetcher'

/**
 * 지도 내 여행 목록 조회
 * @param page 페이지네이션 page
 * @param size 페이지네이션 size
 * @param locationName 지역 이름
 * @returns Trip[]
 */
export async function getTripList(
  page: number,
  size: number,
  locationName: string
): Promise<Paged<Trip>> {
  const { url, method } = API_END_POINT.map.getTrips(page, size, locationName ?? undefined)

  const res = await api.request<ApiData<Paged<Trip>>>(url, { method })
  return res.data
}
