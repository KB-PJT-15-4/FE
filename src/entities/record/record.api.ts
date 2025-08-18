import { Method } from '@/shared/utils/fetcher'

export const record = {
  // 여행 기록 목록 조회
  getTripRecords: (tripId: number, page: number, size: number, date?: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/trips/${tripId}/records?page=${page}&size=${size}${
      date ? `&date=${encodeURIComponent(date)}` : ''
    }`,
    method: Method.GET,
  }),

  // 여행 기록 상세 조회
  getRecordDetail: (tripId: number, recordId: number) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/trips/${tripId}/records/${recordId}`,
    method: Method.GET,
  }),

  // 여행 기록 생성
  createRecord: (tripId: number) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/trips/${tripId}/records`,
    method: Method.POST,
  }),

  // 여행 기록 수정
  updateRecord: (tripId: number, recordId: number) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/trips/${tripId}/records/${recordId}`,
    method: Method.PUT,
  }),

  // 여행 기록 삭제
  deleteTripRecord: (tripId: number, recordId: number) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/trips/${tripId}/records/${recordId}`,
    method: Method.DELETE,
  }),

  // 결제 내역 조회
  getPaymentRecords: (tripId: number) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/trips/${tripId}/records/payment-records`,
    method: Method.GET,
  }),

  // 예매 내역 조회
  getReservationsByDate: (tripId: number, date: string, page: number, size: number) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/member/reservation/by-date?tripId=${tripId}&date=${encodeURIComponent(
      date
    )}&page=${page}&size=${size}`,
    method: Method.GET,
  }),
}
