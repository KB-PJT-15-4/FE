import { api } from '@/shared/utils/api'
import { API_END_POINT, type ApiData } from '@/shared/utils/fetcher'

/**
 * 여행 생성
 * @param tripName 여행 이름
 * @param startTime 여행 시작 일자
 * @param endTime 여행 종료 일자
 * @param location 여행 지역
 * @param memberIds 여행 멤버 리스트
 * @returns trip id
 */
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

/**
 * 여행 멤버 email을 통해 id 반환
 * @param email 여행 멤버 이메일
 * @returns 멤버 id
 */
export async function getIdByEmail(email: string): Promise<number> {
  const { url, method } = API_END_POINT.user.getIdByEmail(email)

  const res = await api.request<ApiData<number>>(url, { method })
  return res.data
}

/**
 * 여행 멤버 email을 통해 이미 여행에 있는 멤버인지 검사하고 id를 반환
 * @param email 여행 멤버 이메일
 * @param tripId 여행 id
 * @returns 멤버 id
 */
export async function getValidMemberIdByEmail(email: string, tripId: string): Promise<number> {
  const { url, method } = API_END_POINT.user.getValidMemberIdByEmail(email, tripId)

  const res = await api.request<ApiData<number>>(url, { method })
  return res.data
}

/**
 * 여행에 멤버 초대
 * @param tripId 여행 id
 * @param memberIds 초대하려는 멤버 id 리스트
 * @returns 초대 성공 여부
 */
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
