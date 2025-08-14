import type {
  AccommodationItem,
  RestaurantCategory,
  RestaurantItem,
  RestaurantTimeSlot,
  RoomType,
  TransportationItem,
  TransportationSeat,
} from '@/entities/trip/trip.entity'
import { api } from '@/shared/utils/api'
import { API_END_POINT, type ApiData, type Paged } from '@/shared/utils/fetcher'

/**
 * 예약 가능한 식당을 조회
 * @param tripId 여행 id
 * @param date 예약 날짜
 * @param category 식당 카테고리
 * @returns RestaurantItem[]
 */
export async function getRestaurantList(
  tripId: string,
  date: string,
  category: string
): Promise<Paged<RestaurantItem>> {
  const { url, method } = API_END_POINT.trip.getRestaurantList(tripId, date, category)

  const res = await api.request<ApiData<Paged<RestaurantItem>>>(url, { method })
  return res.data
}

/**
 * 식당의 카테고리를 조회
 * @returns RestaurantCategory[]
 */
export async function getRestaurantCategoryList(): Promise<RestaurantCategory[]> {
  const { url, method } = API_END_POINT.trip.getRestaurantCategoryList()

  const res = await api.request<ApiData<RestaurantCategory[]>>(url, { method })
  return res.data
}

/**
 * 식당의 예약 가능한 시간대를 조회
 * @param restId 식당 id
 * @param date 예약 날짜
 * @returns RestaurantTimeSlot[]
 */
export async function getAvailableTimeTimeList(
  restId: string,
  date: string
): Promise<RestaurantTimeSlot[]> {
  const { url, method } = API_END_POINT.trip.getAvailableTimeList(restId, date)

  const res = await api.request<ApiData<RestaurantTimeSlot[]>>(url, { method })
  return res.data
}

/**
 * 식당의 정보를 조회
 * @param restId 식당 id
 * @returns RestaurantItem
 */
export async function getRestaurantInfo(restId: string): Promise<RestaurantItem> {
  const { url, method } = API_END_POINT.trip.getRestaurantInfo(restId)

  const res = await api.request<ApiData<RestaurantItem>>(url, { method })
  return res.data
}

/**
 * 식당을 예약
 * @param tripId 여행 id
 * @param restId 식당 id
 * @param date 예약 날짜
 * @param time 예약 시간
 * @param resNum 예약 인원
 * @returns 예약 성공 여부
 */
export async function reservationRestaurant(
  tripId: number,
  restId: number,
  date: string,
  time: string,
  resNum: number
): Promise<boolean> {
  const { url, method } = API_END_POINT.trip.reservationRestaurant()

  const res = await api.request<ApiData<boolean>>(url, {
    method,
    data: {
      tripId,
      restId,
      date,
      time,
      resNum,
    },
  })
  return res.data
}

/**
 * 예약 가능한 교통편을 조회
 * @param origin 출발지
 * @param destination 도착지
 * @param startDate 출발 시간
 * @param startTime 도착 시간
 * @returns TransportationItem[]
 */
export async function getTransportList(
  origin: string,
  destination: string,
  startDate: string,
  startTime: string
): Promise<Paged<TransportationItem>> {
  const startDateTime = startDate + 'T' + startTime
  const { url, method } = API_END_POINT.trip.getTransportList(origin, destination, startDateTime)

  const res = await api.request<ApiData<Paged<TransportationItem>>>(url, { method })
  return res.data
}

/**
 * 교통편의 좌석정보를 조회
 * @param transportId 교통편 id
 * @returns Record<string, TransportationSeat[]>
 */
export async function getTransportationSeatsStatus(
  transportId: string
): Promise<Record<string, TransportationSeat[]>> {
  const { url, method } = API_END_POINT.trip.getSeatsStatus(transportId)

  const res = await api.request<ApiData<Record<string, TransportationSeat[]>>>(url, { method })
  return res.data
}

/**
 * 좌석을 선택하고 서버에 전송
 * @param tripId 여행 id
 * @param tranResIds 선택한 좌석 id 리스트
 * @param reservationDate 예약 날짜
 * @param reservationTime 예약 시간
 * @returns 결제 전 예약 번호
 */
export async function selectSeat(
  tripId: string,
  tranResIds: number[],
  reservationDate: string,
  reservationTime: string
): Promise<string> {
  const departureDateTime = reservationDate + 'T' + reservationTime
  const { url, method } = API_END_POINT.trip.selectSeat()

  const res = await api.request<ApiData<string>>(url, {
    method,
    data: {
      tripId,
      tranResIds,
      departureDateTime,
    },
  })
  return res.data
}

/**
 * 교통편을 예약
 * @param reservationId 교통편 예약 번호
 * @param price 가격
 * @returns 예약 성공 여부
 */
export async function reservationTransportation(
  reservationId: number,
  price: number
): Promise<boolean> {
  const { url, method } = API_END_POINT.trip.reservationTransportation()

  const res = await api.request<ApiData<boolean>>(url, {
    method,
    data: {
      reservationId,
      price,
    },
  })
  return res.data
}

/**
 * 교통편 예약을 취소
 * @param reservationId 교통편 예약 번호
 * @returns 예약 취소 성공 여부
 */
export async function cancelTransportationReservation(reservationId: number): Promise<boolean> {
  const { url, method } = API_END_POINT.trip.cancelTransportReservation()

  const res = await api.request<ApiData<boolean>>(url, {
    method,
    data: {
      reservationId,
    },
  })
  return res.data
}

/**
 * 예약 가능한 숙박시설을 조회
 * @param tripId 여행 id
 * @param startDate 숙박 시작 날짜
 * @param endDate 숙박 종료 날짜
 * @returns AccommodationItem[]
 */
export async function getAccommodationList(
  tripId: string,
  startDate: string,
  endDate: string
): Promise<Paged<AccommodationItem>> {
  const { url, method } = API_END_POINT.trip.getAccommodationList(tripId, startDate, endDate)

  const res = await api.request<ApiData<Paged<AccommodationItem>>>(url, { method })
  return res.data
}

/**
 * 숙박시설 정보를 조회
 * @param accomId 숙박 시설 id
 * @returns AccommodationItem
 */
export async function getAccommodationInfo(accomId: string): Promise<AccommodationItem> {
  const { url, method } = API_END_POINT.trip.getAccommodationInfo(accomId)

  const res = await api.request<ApiData<AccommodationItem>>(url, { method })
  return res.data
}

/**
 * 한 숙박시설의 예약 가능한 방 정보 조회
 * @param tripId 여행 id
 * @param accomId 숙박시설 id
 * @param checkinDay 체크인 날짜
 * @param checkoutDay 체크아웃 날짜
 * @param guests 인원
 * @returns RoomType[]
 */
export async function getRoomList(
  tripId: string,
  accomId: string,
  checkinDay: string,
  checkoutDay: string,
  guests: number
): Promise<RoomType[]> {
  const { url, method } = API_END_POINT.trip.getRoomList(
    tripId,
    accomId,
    checkinDay,
    checkoutDay,
    guests
  )

  const res = await api.request<ApiData<RoomType[]>>(url, { method })
  return res.data
}

/**
 * 숙박시설 예약
 * @param tripId 여행 id
 * @param accomResId 숙박시설 id
 * @param checkinDay 체크인 날짜
 * @param checkoutDay 체크아웃 날짜
 * @param guests 인원
 * @param price 가격
 * @returns 예약 성공 여부
 */
export async function reservationAccommodation(
  tripId: number,
  accomResId: number,
  checkinDay: string,
  checkoutDay: string,
  guests: number,
  price: number
): Promise<boolean> {
  const { url, method } = API_END_POINT.trip.reservationAccommodation()

  const res = await api.request<ApiData<boolean>>(url, {
    method,
    data: {
      tripId,
      accomResId,
      checkinDay,
      checkoutDay,
      guests,
      price,
    },
  })
  return res.data
}
