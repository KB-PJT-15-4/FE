import axios from 'axios'
import type {
  Trip,
  ApiReservationItem,
  ApiPaymentRecord,
  Record as TripRecord,
} from '@/entities/record/record.entity'

// 공통 타입
export interface Paged<T> {
  content: T[]
  totalPages?: number
  totalElements?: number
}

function normalizePaged<T>(data: unknown): Paged<T> {
  const obj = data as { content?: unknown; totalPages?: number; totalElements?: number }
  if (Array.isArray(obj?.content as unknown[])) {
    return {
      content: (obj.content as unknown[]) as T[],
      totalPages: obj.totalPages,
      totalElements: obj.totalElements,
    }
  }
 
  if (Array.isArray(data as unknown[])) {
    return { content: (data as unknown[]) as T[], totalPages: 1, totalElements: (data as unknown[]).length }
  }
  // 데이터 알 수 없는 경우
  return { content: [], totalPages: 0, totalElements: 0 }
}


//RecordDetailTripCard.vue 기능
export async function fetchTripById(params: {
  token: string
  apiBaseUrl: string
  tripId: number
}): Promise<Trip | null> {
  const { token, apiBaseUrl, tripId } = params

  const response = await axios.get(`${apiBaseUrl}/api/trips`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const paged = normalizePaged<Trip>(response.data?.data)
  const found = paged.content.find((t) => t.tripId === tripId) ?? null
  return found
}


//RecordDetailDate.vue 기능
export function isValidDateInRange(date: string, startDate: string, endDate: string): boolean {
  const target = new Date(date)
  const start = new Date(startDate)
  const end = new Date(endDate)
  return target >= start && target <= end
}


//RecordDetailReCard.vue 기능
export async function fetchReservationByDate(params: {
  token: string
  apiBaseUrl: string
  tripId: number
  date: string
  page?: number
  size?: number
}): Promise<Paged<ApiReservationItem>> {
  const { token, apiBaseUrl, tripId, date, page = 0, size = 10 } = params

  const response = await axios.get(`${apiBaseUrl}/api/member/reservation/by-date`, {
    params: { tripId, date, page, size },
    headers: { Authorization: `Bearer ${token}` },
  })

  return normalizePaged<ApiReservationItem>(response.data?.data)
}


//RecordDetailCredCard.vue 기능
export async function fetchPaymentRecords(params: {
  token: string
  apiBaseUrl: string
  tripId: number
}): Promise<ApiPaymentRecord[]> {
  const { token, apiBaseUrl, tripId } = params

  const response = await axios.get(`${apiBaseUrl}/api/trips/${tripId}/records/payment-records`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (response.data?.code === 'S200') {
    const data = response.data?.data as unknown
    if (Array.isArray(data as unknown[])) {
      return (data as unknown[]) as ApiPaymentRecord[]
    }
    return []
  }
  return []
}


//RecordDetailCustom.vue 기능
export async function fetchUserRecords(params: {
  token: string
  apiBaseUrl: string
  tripId: number
  date: string
  page: number // 0-based
  size: number
}): Promise<Paged<TripRecord>> {
  const { token, apiBaseUrl, tripId, date, page, size } = params
  const searchParams = new URLSearchParams({
    date,
    page: String(page),
    size: String(size),
  })

  const response = await axios.get(`${apiBaseUrl}/api/trips/${tripId}/records?${searchParams.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return normalizePaged<TripRecord>(response.data?.data)
}

export async function deleteUserRecord(params: {
  token: string
  apiBaseUrl: string
  tripId: number
  recordId: number
}): Promise<boolean> {
  const { token, apiBaseUrl, tripId, recordId } = params

  const response = await axios.delete(`${apiBaseUrl}/api/trips/${tripId}/records/${recordId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data?.code === 'S200'
}