// 여행 리스트
export interface UserTripList {
  id: string
  title: string
  startDate: string
  endDate: string
  status: 'Planned' | 'Active' | 'Closed'
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
