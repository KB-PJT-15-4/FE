import { API_END_POINT } from '@/shared/utils/fetcher'

export async function getDecodeIdQR(data: string) {
  const { url, method } = API_END_POINT.user.getDecodeIdQR(data)
  const result = await fetch(url, {
    method: method,
  })

  if (!result.ok) {
    const errorBody = await result.json().catch(() => ({}))
    throw new Error(errorBody.message)
  }

  const res = await result.json()
  return res.data
}
