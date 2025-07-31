import { API_END_POINT } from '@/shared/utils/fetcher'

export async function getTransportList(
  token: string,
  origin: string,
  destination: string,
  startDate: string,
  startTime: string
) {
  const startDateTime = startDate + 'T' + startTime
  const { url, method } = API_END_POINT.trip.getTransportList(origin, destination, startDateTime)
  const result = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const res = await result.json()
  return res.data
}
