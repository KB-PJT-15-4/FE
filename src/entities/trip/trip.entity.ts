// 여행 리스트
export interface UserTripList {
  id: string
  title: string
  startDate: string
  endDate: string
  status: '여행 예정' | '여행 중' | '여행 종료'
  location: string
}

// [메인페이지] 예매내역 여행 당 예약내역 리스트
export interface UserReservationList {
  id: string
  type: string
  title: string
  date: string
  imageUrl: string
}
