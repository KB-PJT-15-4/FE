import { API_END_POINT } from '@/shared/utils/fetcher'

export async function getNotifications(token: string) {
  const { url, method } = API_END_POINT.user.getNotifications()

  const result = await fetch(url, {
    method: method,
    headers: {
      Authorizations: `Bearer ${token}`,
    },
  })

  if (!result.ok) {
    const errorBody = await result.json().catch(() => ({}))
    throw new Error(errorBody.message)
  }

  const res = await result.json()
  return res.data
}

export async function postNotification(
  token: string,
  type: string,
  tripId: number,
  notificationId: number
) {
  const { url, method } = API_END_POINT.user.getNotifications()

  const result = await fetch(url, {
    method: method,
    headers: {
      Authorizations: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type,
      tripId,
      notificationId,
    }),
  })

  if (!result.ok) {
    const errorBody = await result.json().catch(() => ({}))
    throw new Error(errorBody.message)
  }

  const res = await result.json()
  return res.data
}

export async function readNotification(token: string, tripId: number, notificationId: number) {
  const { url, method } = API_END_POINT.user.readNotification()

  const result = await fetch(url, {
    method: method,
    headers: {
      Authorizations: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tripId,
      notificationId,
    }),
  })

  if (!result.ok) {
    const errorBody = await result.json().catch(() => ({}))
    throw new Error(errorBody.message)
  }

  const res = await result.json()
  return res.data
}
