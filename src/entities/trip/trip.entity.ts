export const filterTabOptions = ['전체', '교통', '숙박', '식당']
export const locationList = ['서울', '부산', '대구', '인천', '광주', '대전', '울산']
export const restaurantTypeList = [
  '한식',
  '중식',
  '일식',
  '양식',
  '분식',
  '패스트푸드',
  '치킨',
  '피자',
  '족발/보쌈',
  '고기구이',
  '회/해산물',
  '뷔페',
  '샤브샤브/훠궈',
  '베이커리/디저트',
  '카페',
  '술집/포차',
  '건강식/채식',
  '기타',
]

export enum ReservationType {
  Accommodation = 'accommodation',
  Transportation = 'transportation',
  Restaurant = 'restaurant',
}

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
export interface ReservationItem {
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
