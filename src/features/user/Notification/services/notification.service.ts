import type { UserNotification } from '@/entities/user/user.entity'
import { api } from '@/shared/utils/api'
import { API_END_POINT, type ApiData } from '@/shared/utils/fetcher'

/**
 * 알림 호출
 * @returns UserNotification[]
 */
export async function getNotifications(): Promise<UserNotification[]> {
  const { url, method } = API_END_POINT.user.getNotifications()

  const res = await api.request<ApiData<UserNotification[]>>(url, { method })
  return res.data
}

/**
 * 여행 초대 알림 수락/거절 처리
 * @param type 수락/거절
 * @param tripId 여행 id
 * @param notificationId 알림 id
 * @returns 수락/거절 성공 여부
 */
export async function postNotification(
  type: '수락' | '거절',
  tripId: number,
  notificationId: number
): Promise<boolean> {
  const { url, method } = API_END_POINT.user.postNotification()

  const res = await api.request<ApiData<boolean>>(url, {
    method,
    data: {
      type,
      tripId,
      notificationId,
    },
  })
  return res.data
}

/**
 * 정산 요청 알림 읽음 처리
 * @param tripId 여행 id
 * @param notificationId 알림 id
 * @returns 읽음 처리 성공 여부
 */
export async function readNotification(tripId: number, notificationId: number): Promise<boolean> {
  const { url, method } = API_END_POINT.user.readNotification()

  const res = await api.request<ApiData<boolean>>(url, {
    method,
    data: {
      tripId,
      notificationId,
    },
  })

  return res.data
}

/**
 * 서버에 디바이스 토큰을 전송
 * @param fcmToken 디바이스 토큰
 * @returns 토큰 전송 성공 여부
 */
export async function postFcmToken(fcmToken: string): Promise<boolean> {
  const { url, method } = API_END_POINT.user.postFcmToken()

  const res = await api.request<ApiData<boolean>>(url, {
    method,
    data: {
      fcmToken,
    },
  })
  return res.data
}
