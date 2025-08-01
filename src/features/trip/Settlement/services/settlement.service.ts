import type { SettleExpenses } from '@/entities/trip/trip.entity'
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

export async function getSettleList(token: string, tripId: string) {
  const { url, method } = API_END_POINT.trip.getSettleList(tripId)
  const result = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const res = await result.json()
  return res.data
}

export async function makeSettlement(
  token: string,
  tripId: string,
  amount: string,
  expenseName: string,
  expenses: SettleExpenses[]
) {
  const { url, method } = API_END_POINT.trip.makeSettlement()
  const result = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tripId,
      amount,
      expenseName,
      expenses,
    }),
  })

  const res = await result.json()
  return res.data
}

export async function getSettlementStatus(token: string, expenseId: string) {
  const { url, method } = API_END_POINT.trip.getSettlementStatus(expenseId)
  const result = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const res = await result.json()
  return res.data
}

export async function getSettlementInfo(token: string, expenseId: string) {
  const { url, method } = API_END_POINT.trip.getSettlementInfo(expenseId)
  const result = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const res = await result.json()
  console.log(res.data)
  return res.data
}
