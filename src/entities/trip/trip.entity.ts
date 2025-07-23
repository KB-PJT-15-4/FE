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
  type: 'accommodation' | 'transportation' | 'restaurant' // 숙박, 항공, 식당
  title: string // 예매 장소 이름
  date: string // 예매 날짜
  imageUrl: string // 예매 사진
}

// [여행 페이지] 예매 가능 항목
export interface AvailableReservation {
  itemId: string // 예매 항목 id
  type: 'accommodation' | 'transportation' | 'restaurant' // 숙박, 항공, 식당
  title: string // 예매 항목 장소 이름
  description?: string // 설명(optional)
  imageUrl: string // 예매 항목 사진
}
