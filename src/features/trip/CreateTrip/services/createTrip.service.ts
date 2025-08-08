import { API_END_POINT } from '@/shared/utils/fetcher'

export async function createTrip(
  token: string,
  tripName: string,
  startTime: string,
  endTime: string,
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

  if (!result.ok) {
    const errorBody = await result.json().catch(() => ({}))
    throw new Error(errorBody.message)
  }

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

  if (!result.ok) {
    const errorBody = await result.json().catch(() => ({}))
    throw new Error(errorBody.message)
  }
  const res = await result.json()
  return res.data
}

export async function getValidMemberIdByEmail(token: string, email: string, tripId: string) {
  const { url, method } = API_END_POINT.user.getValidMemberIdByEmail(email, tripId)

  const result = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  const res = await result.json()

  if (!result.ok) {
    const error: Error & { status?: number; code?: string } = new Error(res.message || '에러 발생')
    error.status = result.status
    error.code = res.code
    throw error
  }

  return res.data
}

export async function inviteMembers(token: string, tripId: number, memberIds: number[]) {
  const { url, method } = API_END_POINT.trip.inviteMembers()

  const result = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      tripId,
      memberIds,
    }),
  })

  if (!result.ok) {
    const errorBody = await result.json().catch(() => ({}))
    throw new Error(errorBody.message)
  }

  const res = await result.json()
  return res.data
}
