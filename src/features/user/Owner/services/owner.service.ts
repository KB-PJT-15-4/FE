import { API_END_POINT } from '@/shared/utils/fetcher'

export async function getDecodeIdQR(token: string, data: string) {
  const { url, method } = API_END_POINT.user.getDecodeIdQR(data)
  const result = await fetch(url, {
    method: method,
    headers: {
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

export async function getDecodeReservationQR(token: string, data: string) {
  const { url, method } = API_END_POINT.user.getDecodeReservationQR(data)
  const result = await fetch(url, {
    method: method,
    headers: {
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
