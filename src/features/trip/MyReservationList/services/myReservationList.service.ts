import { API_END_POINT } from '@/shared/utils/fetcher'

export async function getMyReservationList(
  token: string,
  tripId: number,
  page: number,
  size: number,
  resKind: string | null
) {
  const { url, method } = API_END_POINT.trip.getReservationList(tripId, resKind, page, size)
  const result = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!result.ok) {
    const errorBody = await result.json().catch(() => ({}))
    throw new Error(errorBody.message)
  }

  const res = await result.json()
  return res.data
}

export async function getReservationQR(token: string, itemId: number) {
  const { url, method } = API_END_POINT.trip.getReservationQr(itemId)
  const result = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!result.ok) {
    const errorBody = await result.json().catch(() => ({}))
    throw new Error(errorBody.message)
  }

  const res = await result.json()
  return res.data
}
