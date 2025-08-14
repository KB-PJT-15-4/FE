import type { IdInfo } from '@/entities/user/user.entity'
import { api } from '@/shared/utils/api'
import { API_END_POINT, type ApiData } from '@/shared/utils/fetcher'

/**
 * 회원의 주민등록증/운전면허증 조회
 * @returns IdInfo (UserIDCard, UserDriversLicenseCard)
 */
export async function getIdInfo(): Promise<IdInfo> {
  const { url, method } = API_END_POINT.user.getIdInfo()

  const res = await api.request<ApiData<IdInfo>>(url, { method })
  return res.data
}

/**
 * 회원의 주민등록증 QR 스트링 조회
 * @returns QR 스트링값
 */
export async function getIdQR(): Promise<string> {
  const { url, method } = API_END_POINT.user.getIdQR()

  const res = await api.request<ApiData<string>>(url, { method })
  return res.data
}
