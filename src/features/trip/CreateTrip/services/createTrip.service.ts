import { API_END_POINT } from '@/shared/utils/fetcher'

export async function createTrip(
  token: string,
  tripName: string,
  startTime: Date,
  endTime: Date,
  location: string,
  memberIds: number[]
) {
  const { url, method } = API_END_POINT.trip.createTrip()

  const result = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      tripName,
      startTime,
      endTime,
      location,
      memberIds,
    }),
  })

  const res = await result.json()
  return res.data
}

export async function getIdByEmail(token: string, email: string) {
  const { url, method } = API_END_POINT.user.getIdByEmail(email)

  const result = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  const res = await result.json()
  return res.data
}
