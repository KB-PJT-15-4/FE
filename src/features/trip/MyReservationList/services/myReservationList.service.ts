import type { Reservation, TripInfo, UserReservationList } from '@/entities/trip/trip.entity'
import { api } from '@/shared/utils/api'
import { API_END_POINT, type ApiData, type Paged } from '@/shared/utils/fetcher'

/**
 * 나의 예약 내역 조회
 * @param tripId 여행 id
 * @param page 페이지네이션 page
 * @param size 페이지네이션 size
 * @param resKind 조회하려는 업종
 * @returns UserReservationList
 */
export async function getMyReservationList(
  tripId: number,
  page: number,
  size: number,
  resKind: 'TRANSPORT' | 'ACCOMMODATION' | 'RESTAURANT' | null
): Promise<Paged<UserReservationList>> {
  const { url, method } = API_END_POINT.trip.getReservationList(tripId, resKind, page, size)

  const res = await api.request<ApiData<Paged<UserReservationList>>>(url, { method })
  return res.data
}

/**
 * 예약 내역 QR 및 정보 조회
 * @param itemId 예약 id
 * @returns Reservation
 */
export async function getReservationQR(itemId: number): Promise<Reservation[]> {
  const { url, method } = API_END_POINT.trip.getReservationQr(itemId)

  const res = await api.request<ApiData<Reservation[]>>(url, { method })
  return res.data
}

/**
 * 여행의 정보를 조회
 * @param tripId 여행 id
 * @returns TripInfo
 */
export async function getTripInfo(tripId: string): Promise<TripInfo> {
  const { url, method } = API_END_POINT.trip.getTripInfo(tripId)

  const res = await api.request<ApiData<TripInfo>>(url, { method })
  return res.data
}
