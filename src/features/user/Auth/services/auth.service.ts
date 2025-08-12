import { API_END_POINT } from '@/shared/utils/fetcher'

export async function login(email: string, password: string) {
  const { url, method } = API_END_POINT.user.login()
  const result = await fetch(url, {
    method: method,
    credentials: 'include',
    body: JSON.stringify({
      email,
      password,
    }),
  })

  if (!result.ok) {
    const errorBody = await result.json().catch(() => ({}))
    throw new Error(errorBody.message)
  }

  const res = await result.json()
  return res.data
}
