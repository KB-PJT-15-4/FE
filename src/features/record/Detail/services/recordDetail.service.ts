import type {
  PaymentRecord,
  ReservationItem,
  Trip,
  Record as TripRecord,
} from '@/entities/record/record.entity'
import { api } from '@/shared/utils/api'

import { API_END_POINT, type ApiData, type Paged } from '@/shared/utils/fetcher'
import { isValidDateInRange } from '@/shared/utils/format'

/**
 * 여행 id를 통해 여행 정보를 가져옴
 * @param tripId 여행 id
 * @returns Trip
 */
export async function getTripInfo(tripId: number): Promise<Trip | null> {
  const { url, method } = API_END_POINT.trip.getTripInfo(String(tripId))

  const res = await api.request<ApiData<Trip>>(url, { method })
  return res.data
}

/**
 * 여행 및 현재 날짜가 유효한지 조회
 * @param tripId 여행 id
 * @param queryDate 조회하려는 날짜
 * @returns 여행, 현재 날짜 or 여행 시작 날짜
 */
export async function getTripAndResolveDate(
  tripId: number,
  date?: string
): Promise<{ trip: Trip | null; resolvedDate?: string }> {
  const trip = await getTripInfo(tripId)
  if (!trip) return { trip: null, resolvedDate: undefined }

  if (date && isValidDateInRange(date, trip.startDate, trip.endDate)) {
    return { trip, resolvedDate: date }
  }
  return { trip, resolvedDate: trip.startDate }
}

/**
 * 결제 내역 조회
 * @param tripId 여행 id
 * @returns PaymentRecord
 */
export async function getPaymentRecords(tripId: number): Promise<PaymentRecord[]> {
  const { url, method } = API_END_POINT.record.getPaymentRecords(tripId)

  const res = await api.request<ApiData<PaymentRecord[]>>(url, { method })
  return res.data
}

/**
 * 날짜별 예약 내역 조회
 * @param tripId 여행 id
 * @param date 조회 날짜
 * @param page 페이지네이션 page
 * @param size 페이지네이션 size
 * @returns ReservationItem[]
 */
export async function getReservationsByDate(
  tripId: number,
  date: string,
  page: number,
  size: number
): Promise<Paged<ReservationItem>> {
  const { url, method } = API_END_POINT.record.getReservationsByDate(tripId, date, page, size)

  const res = await api.request<ApiData<Paged<ReservationItem>>>(url, { method })
  return res.data
}

/**
 * 여행 기록 조회
 * @param tripId 여행 id
 * @param page 페이지네이션 page
 * @param size 페이지네이션 size
 * @param date 조회 날짜
 * @returns TripRecord[]
 */
export async function getRecords(
  tripId: number,
  page: number,
  size: number,
  date?: string
): Promise<Paged<TripRecord>> {
  const { url, method } = API_END_POINT.record.getTripRecords(tripId, page, size, date)

  const res = await api.request<ApiData<Paged<TripRecord>>>(url, { method })
  return res.data
}

export async function deleteRecord(tripId: number, recordId: number): Promise<boolean> {
  const { url, method } = API_END_POINT.record.deleteTripRecord(tripId, recordId)

  const res = await api.request<ApiData<boolean>>(url, { method })
  return res.data
}
