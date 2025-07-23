// OverLay

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