import { api } from '@/shared/utils/api'
import { API_END_POINT, type ApiData } from '@/shared/utils/fetcher'

export async function createTrip(
  tripName: string,
  startTime: string,
  endTime: string,
  location: string,
  memberIds: number[]
): Promise<string> {
  const { url, method } = API_END_POINT.trip.createTrip()

  const res = await api.request<ApiData<string>>(url, {
    method,
    data: {
      tripName,
      startTime,
      endTime,
      location,
      memberIds,
    },
  })

  return res.data
}

export async function getIdByEmail(email: string): Promise<number> {
  const { url, method } = API_END_POINT.user.getIdByEmail(email)

  const res = await api.request<ApiData<number>>(url, { method })
  return res.data
}

export async function getValidMemberIdByEmail(email: string, tripId: string): Promise<number> {
  const { url, method } = API_END_POINT.user.getValidMemberIdByEmail(email, tripId)

  const res = await api.request<ApiData<number>>(url, { method })
  return res.data
}

export async function inviteMembers(tripId: number, memberIds: number[]): Promise<boolean> {
  const { url, method } = API_END_POINT.trip.inviteMembers()

  const res = await api.request<ApiData<boolean>>(url, {
    method,
    data: {
      tripId,
      memberIds,
    },
  })
  return res.data
}
