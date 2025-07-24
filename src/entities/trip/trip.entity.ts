// 여행 리스트
export interface TripInfo {
  id: string
  title: string
  startDate: string
  endDate: string
  status: '여행 예정' | '여행 중' | '여행 종료'
  location: string
}

// [메인페이지, 여헹 페이지] 여행 당 예약내역 리스트
export interface UserReservationList {
  id: string // 예매 id
  tripId: string // 여행 id
  type: 'accommodation' | 'transportation' | 'restaurant' // 숙박, 교통, 식당
  title: string // 예매 장소 이름
  date: string // 예매 날짜
  imageUrl: string // 예매 사진
}

// [여행 페이지] 예매 가능 항목
export interface AvailableReservation {
  itemId: string // 예매 항목 id
  type: 'accommodation' | 'transportation' | 'restaurant' // 숙박, 교통, 식당
  title: string // 예매 항목 장소 이름
  imageUrl: string // 예매 항목 사진

  description?: string // 예매 가능 항목 설명(optional)
  address?: string // restaurant, accommodation 주소(optional)
}

// [예매 페이지] 예매하기
interface BaseReservationInfo {
  itemId: string
  people: number
  tile: string
}

export interface AccommodationReservation extends BaseReservationInfo {
  startDate: string
  endDate: string
}

export interface TransportationReservation extends BaseReservationInfo {
  origin: string
  destination: string
  date: string
}

export interface RestaurantReservation extends BaseReservationInfo {
  category: string
  date: string
}
