import { API_END_POINT } from '@/shared/utils/fetcher'

export async function getTripList(token: string, page: number, size: number) {
  const { url, method } = API_END_POINT.trip.getTripList(page, size)
  const result = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!result.ok) {
    const errorBody = await result.json().catch(() => ({}))
    throw new Error(errorBody.message)
  }

  const res = await result.json()
  return res.data
}
