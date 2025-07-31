import { API_END_POINT } from '@/shared/utils/fetcher'

export async function getMemberList(token: string, tripId: string) {
  const { url, method } = API_END_POINT.trip.getMemberList(tripId)
  const result = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const res = await result.json()
  return res.data
}
