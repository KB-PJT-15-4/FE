import type { Reservation, TripInfo, UserReservationList } from '@/entities/trip/trip.entity'
import { api } from '@/shared/utils/api'
import { API_END_POINT, type ApiData, type Paged } from '@/shared/utils/fetcher'

export async function getMyReservationList(
  tripId: number,
  page: number,
  size: number,
  resKind: string | null
): Promise<Paged<UserReservationList>> {
  const { url, method } = API_END_POINT.trip.getReservationList(tripId, resKind, page, size)

  const res = await api.request<ApiData<Paged<UserReservationList>>>(url, { method })
  return res.data
}

export async function getReservationQR(itemId: number): Promise<Reservation[]> {
  const { url, method } = API_END_POINT.trip.getReservationQr(itemId)

  const res = await api.request<ApiData<Reservation[]>>(url, { method })
  return res.data
}

export async function getTripInfo(tripId: string): Promise<TripInfo> {
  const { url, method } = API_END_POINT.trip.getTripInfo(tripId)

  const res = await api.request<ApiData<TripInfo>>(url, { method })
  return res.data
}
