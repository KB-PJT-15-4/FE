export interface OverLay {
    tripId: number
    title: string
    startDate: string
    endDate: string
    status: '여행 예정' | '여행 중' | '여행 종료'
    location: string
    latitude: number
    longitude: number
}

export interface UserReservationList {
  id: string
  type: string
  title: string
  date: string
  imageUrl: string
}

// 결재내역 mock 데이터
export interface CreditList {
    title: string
    date: string
    cost: number
}