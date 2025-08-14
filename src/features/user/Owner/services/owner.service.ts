import type {
  ReservedAccommodationItem,
  ReservedRestaurantItem,
  ReservedTransportationItem,
  UserIDCard,
} from '@/entities/user/user.entity'

import { api } from '@/shared/utils/api'
import { API_END_POINT, type ApiData } from '@/shared/utils/fetcher'

/**
 * 주민등록증 QR 복호화 값으로 유저 정보 조회
 * @param data QR 스트링
 * @returns UserIDCard
 */
export async function getDecodeIdQR(data: string): Promise<UserIDCard> {
  const { url, method } = API_END_POINT.user.getDecodeIdQR(data)

  const res = await api.request<ApiData<UserIDCard>>(url, { method })
  return res.data
}

/**
 * 예약권 QR 복호화 값으로 예약권 정보 조회
 * @param data QR 스트링
 * @returns ReservedAccommodationItem | ReservedRestaurantItem | ReservedTransportationItem
 */
export async function getDecodeReservationQR(
  data: string
): Promise<ReservedAccommodationItem | ReservedRestaurantItem | ReservedTransportationItem> {
  const { url, method } = API_END_POINT.user.getDecodeIdQR(data)

  const res = await api.request<
    ApiData<ReservedAccommodationItem | ReservedRestaurantItem | ReservedTransportationItem>
  >(url, { method })
  return res.data
}
