import type {
  SettleExpenses,
  SettleInfo,
  SettlementProgressStatus,
  TripMember,
  UserSettlement,
} from '@/entities/trip/trip.entity'
import { api } from '@/shared/utils/api'
import { API_END_POINT, type ApiData, type Paged } from '@/shared/utils/fetcher'

/**
 * 여행 멤버 조회
 * @param tripId 여행 id
 * @returns TripMember[]
 */
export async function getMemberList(tripId: string): Promise<TripMember[]> {
  const { url, method } = API_END_POINT.trip.getMemberList(tripId)

  const res = await api.request<ApiData<TripMember[]>>(url, { method })
  return res.data
}

/**
 * 여행 정산 내역 조회
 * @param tripId 여행 id
 * @param page 페이지네이션 page
 * @param size 페이지네이션 size
 * @returns UserSettlement[]
 */
export async function getSettleList(
  tripId: string,
  page: number,
  size: number
): Promise<Paged<UserSettlement>> {
  const { url, method } = API_END_POINT.trip.getSettleList(tripId, page, size)

  const res = await api.request<ApiData<Paged<UserSettlement>>>(url, { method })
  return res.data
}

/**
 * 정산 요청
 * @param tripId 여행 id
 * @param amount 정산 총 비용
 * @param expenseName 정산 제목
 * @param expenses { 멤버 id, 정산 비용 }
 * @returns 정산 요청 성공 여부
 */
export async function makeSettlement(
  tripId: string,
  amount: string,
  expenseName: string,
  expenses: SettleExpenses[]
) {
  const { url, method } = API_END_POINT.trip.makeSettlement()

  const res = await api.request<ApiData<boolean>>(url, {
    method,
    data: {
      tripId,
      amount,
      expenseName,
      expenses,
    },
  })
  return res.data
}

/**
 * 정산 현황 조회
 * @param expenseId 정산 id
 * @returns SettlementProgressStatus
 */
export async function getSettlementStatus(expenseId: string): Promise<SettlementProgressStatus> {
  const { url, method } = API_END_POINT.trip.getSettlementStatus(expenseId)

  const res = await api.request<ApiData<SettlementProgressStatus>>(url, { method })
  return res.data
}

/**
 * 정산에 대한 정보 조회
 * @param expenseId 정산 id
 * @returns SettleInfo
 */
export async function getSettlementInfo(expenseId: string): Promise<SettleInfo> {
  const { url, method } = API_END_POINT.trip.getSettlementInfo(expenseId)

  const res = await api.request<ApiData<SettleInfo>>(url, { method })
  return res.data
}

/**
 * 정산 요청에 대한 정산
 * @param expenseId 정산 id
 * @param amount 정산 금액
 * @returns 정산 성공 여부
 */
export async function postSettle(expenseId: string, amount: number): Promise<boolean> {
  const { url, method } = API_END_POINT.trip.postSettle()

  const res = await api.request<ApiData<boolean>>(url, {
    method,
    data: {
      expenseId,
      amount,
    },
  })
  return res.data
}
