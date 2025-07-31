import { API_END_POINT } from '@/shared/utils/fetcher'

export async function getTripList(token: string, page: number, size: number) {
  const { url, method } = API_END_POINT.trip.getTripList(page, size)
  const result = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const res = await result.json()

  return res.data
}
