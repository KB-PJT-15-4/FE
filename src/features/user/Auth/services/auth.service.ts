import type { UserInfo } from '@/entities/user/user.entity'
import { api } from '@/shared/utils/api'
import { API_END_POINT, type ApiData } from '@/shared/utils/fetcher'

export async function login(email: string, password: string): Promise<UserInfo> {
  const { url, method } = API_END_POINT.user.login()

  const res = await api.request<ApiData<UserInfo>>(url, {
    method,
    data: {
      email,
      password,
    },
  })
  return res.data
}

export async function certification(
  name: string,
  idCardNumber: string,
  accountNumber: string,
  accountPassword: string
) {
  const { url, method } = API_END_POINT.user.certification()
  const result = await fetch(url, {
    method: method,
    credentials: 'include',
    body: JSON.stringify({
      name,
      idCardNumber,
      accountNumber,
      accountPassword,
    }),
  })

  if (!result.ok) {
    const errorBody = await result.json().catch(() => ({}))
    throw new Error(errorBody.message)
  }

  return await result.json()
}

export async function signup(
  email: string,
  password: string,
  name: string,
  idCardNumber: string,
  accountNumber: string,
  accountPassword: string,
  role: string
) {
  const { url, method } = API_END_POINT.user.signup()
  const result = await fetch(url, {
    method: method,
    credentials: 'include',
    body: JSON.stringify({
      email,
      password,
      name,
      idCardNumber,
      accountNumber,
      accountPassword,
      role,
    }),
  })

  if (!result.ok) {
    const errorBody = await result.json().catch(() => ({}))
    throw new Error(errorBody.message)
  }

  return await result.json()
}
