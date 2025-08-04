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

export async function getAvailableTimeTimeList(token: string, restId: string, date: string) {
  const { url, method } = API_END_POINT.trip.getAvailableTimeList(restId, date)
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

export async function reservationRestaurant(
  token: string,
  tripId: number,
  restId: number,
  date: string,
  time: string,
  resNum: number
) {
  const { url, method } = API_END_POINT.trip.reservationRestaurant()
  const result = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tripId,
      restId,
      date,
      time,
      resNum,
    }),
  })

  if (!result.ok) {
    const errorBody = await result.json().catch(() => ({}))
    throw new Error(errorBody.message)
  }

  const res = await result.json()
  return res.data
}

export async function getTransportationSeatsStatus(token: string, transportId: string) {
  const { url, method } = API_END_POINT.trip.getSeatsStatus(transportId)
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

export async function selectSeat(
  token: string,
  tripId: string,
  tranResIds: number[],
  reservationDate: string,
  reservationTime: string
) {
  const reservationDateTime = reservationDate + 'T' + reservationTime
  const { url, method } = API_END_POINT.trip.selectSeat()
  const result = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tripId,
      tranResIds,
      departureDateTime: reservationDateTime,
    }),
  })

  if (!result.ok) {
    const errorBody = await result.json().catch(() => ({}))
    throw new Error(errorBody.message)
  }

  const res = await result.json()
  return res.data
}

export async function reservationTransportation(
  token: string,
  reservationId: number,
  price: number
) {
  const { url, method } = API_END_POINT.trip.reservationTransportation()
  const result = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      reservationId,
      price,
    }),
  })

  if (!result.ok) {
    const errorBody = await result.json().catch(() => ({}))
    throw new Error(errorBody.message)
  }

  const res = await result.json()
  return res.data
}

export async function cancelTransportationReservation(token: string, reservationId: number) {
  const { url, method } = API_END_POINT.trip.cancelTransportReservation()
  const result = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      reservationId,
    }),
  })

  if (!result.ok) {
    const errorBody = await result.json().catch(() => ({}))
    throw new Error(errorBody.message)
  }

  const res = await result.json()
  return res.data
}
