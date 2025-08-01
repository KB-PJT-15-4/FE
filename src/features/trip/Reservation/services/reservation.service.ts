import { API_END_POINT } from '@/shared/utils/fetcher'

export async function getTransportList(
  token: string,
  origin: string,
  destination: string,
  startDate: string,
  startTime: string
) {
  const startDateTime = startDate + 'T' + startTime
  const { url, method } = API_END_POINT.trip.getTransportList(origin, destination, startDateTime)
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

export async function getAccommodationList(
  token: string,
  tripId: string,
  startDate: string,
  endDate: string
) {
  const { url, method } = API_END_POINT.trip.getAccommodationList(tripId, startDate, endDate)
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

export async function getRestaurantList(
  token: string,
  tripId: string,
  date: string,
  category: string
) {
  const { url, method } = API_END_POINT.trip.getRestaurantList(tripId, date, category)
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

export async function getRestaurantCategoryList(token: string) {
  const { url, method } = API_END_POINT.trip.getRestaurantCategoryList()
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
