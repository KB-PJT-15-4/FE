import { API_END_POINT } from '@/shared/utils/fetcher'
import type {
  ApiPaymentRecord,
  ApiReservationItem,
  Record as TripRecord,
  Trip,
} from '@/entities/record/record.entity'
import type { Paged } from '@/shared/utils/common.types'

// accessToken 가져오기
function getTokenOrThrow(): string {
  const token = localStorage.getItem('accessToken')
  if (!token) throw new Error('Access token not found')
  return token
}

// fetch 에러 처리
async function ensureOk(result: Response) {
  if (!result.ok) {
    // 가능한 경우 JSON 파싱
    let message = 'Request failed'
    try {
      const errorBody = await result.json()
      message = errorBody?.message ?? message
    } catch {
      // ignore
    }
    throw new Error(message)
  }
}

// RecordDetailTripCard.vue 기능 분리
export async function fetchTripByIdViaList(tripId: number): Promise<Trip | null> {
  const token = getTokenOrThrow()
  const { url, method } = API_END_POINT.trip.getTripInfo(String(tripId))

  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}` },
  })
  await ensureOk(res)

  const body: unknown = await res.json().catch(() => null)
  if (body && typeof body === 'object' && 'data' in body) {
    return (body as { data: Trip }).data
  }
  return null
}


// RecordDetailDate.vue 기능 분리
export function isValidDateInRange(date: string, startDate: string, endDate: string): boolean {
  const target = new Date(date)
  const start = new Date(startDate)
  const end = new Date(endDate)
  return target >= start && target <= end
}

export async function fetchTripAndResolveDate(
  tripId: number,
  queryDate?: string
): Promise<{ trip: Trip | null; resolvedDate?: string }> {
  const trip = await fetchTripByIdViaList(tripId)
  if (!trip) return { trip: null, resolvedDate: undefined }

  if (queryDate && isValidDateInRange(queryDate, trip.startDate, trip.endDate)) {
    return { trip, resolvedDate: queryDate }
  }
  return { trip, resolvedDate: trip.startDate }
}

// RecordDetailCredCard.vue 기능 분리
export async function fetchPaymentRecords(tripId: number): Promise<ApiPaymentRecord[]> {
  const token = getTokenOrThrow()
  const { url, method } = API_END_POINT.record.getPaymentRecords(tripId)
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  })
  await ensureOk(res)
  const json = await res.json()
  return json?.data ?? []
}

// RecordDetailReCard.vue 기능 분리
export async function fetchReservationsByDate(params: {
  tripId: number
  date: string
  page: number         // 0-based
  size: number         // page size
}): Promise<Paged<ApiReservationItem>> {
  const token = getTokenOrThrow()

  const { url, method } = API_END_POINT.record.getReservationsByDate(
    params.tripId,
    params.date,
    params.page,
    params.size
  )

  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  })
  await ensureOk(res)

  const json = await res.json()

  const content: ApiReservationItem[] = json?.data?.content ?? []
  const totalPages: number | undefined = json?.data?.totalPages
  const totalElements: number | undefined = json?.data?.totalElements

  return { content, totalPages, totalElements }
}

// RecordDetailCustom.vue 기능 분리
export async function fetchRecords(params: {
  tripId: number
  date?: string
  pageIndex: number
  pageSize: number
}): Promise<Paged<TripRecord>> {
  const token = getTokenOrThrow()
  const { url, method } = API_END_POINT.record.getTripRecords(
    params.tripId,
    params.pageIndex,
    params.pageSize,
    params.date
  )
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  })
  await ensureOk(res)
  const json = await res.json()

  const content: TripRecord[] = json?.data?.content ?? json?.data ?? []
  const totalElements: number =
    json?.data?.totalElements ?? (Array.isArray(content) ? content.length : 0)
  const totalPages: number | undefined = json?.data?.totalPages

  return { content, totalElements, totalPages }
}

export async function deleteRecord(tripId: number, recordId: number): Promise<void> {
  const token = getTokenOrThrow()
  const { url, method } = API_END_POINT.record.deleteTripRecord(tripId, recordId)
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  })
  await ensureOk(res)
}
