import { API_END_POINT } from '@/shared/utils/fetcher'

export async function getIdInfo(token: string) {
  const { url, method } = API_END_POINT.user.getIdInfo()
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

export async function getIdQR(token: string) {
  const { url, method } = API_END_POINT.user.getIdQR()
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
