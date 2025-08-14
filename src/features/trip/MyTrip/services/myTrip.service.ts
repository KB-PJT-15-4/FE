import type { TripInfo } from '@/entities/trip/trip.entity'
import { api } from '@/shared/utils/api'
import { API_END_POINT, type ApiData, type Paged } from '@/shared/utils/fetcher'

/**
 * 여행 내역 조회
 * @param page 페이지네이션 page
 * @param size 패이지네이션 size
 * @returns TripInfo[]
 */
export async function getTripList(page: number, size: number): Promise<Paged<TripInfo>> {
  const { url, method } = API_END_POINT.trip.getTripList(page, size)

  const res = await api.request<ApiData<Paged<TripInfo>>>(url, { method })
  return res.data
}
