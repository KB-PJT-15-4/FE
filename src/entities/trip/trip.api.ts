import { Method } from '@/shared/utils/fetcher'

export const trip = {
  createTrip: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/trips`,
    method: Method.POST,
  }),
  getTripMembers: (tripId: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/trip-members?tripId=${tripId}`,
    method: Method.GET,
  }),
  getTripList: (page: number, size: number) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/trips?page=${page}&size=${size}`,
    method: Method.GET,
  }),
  getTransportList: (origin: string, destination: string, startDateTime: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/member/reservation/transport?departureName=${origin}&destinationName=${destination}&departureDateTime=${startDateTime}`,
    method: Method.GET,
  }),
  getAccommodationList: (tripId: string, startDate: string, endDate: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/member/reservation/accommodation?tripId=${tripId}&checkinDay=${startDate}&checkoutDay=${endDate}`,
    method: Method.GET,
  }),
  getRestaurantList: (tripId: string, date: string, category: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/member/reservation/restaurant/available?tripId=${tripId}&date=${date}&category=${category}`,
    method: Method.GET,
  }),
  getRestaurantCategoryList: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/reservation/restaurant/category`,
    method: Method.GET,
  }),
  getMemberList: (tripId: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/trip-members?tripId=${tripId}`,
    method: Method.GET,
  }),
  getSettleList: (tripId: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/expense?tripId=${tripId}`,
    method: Method.GET,
  }),
  makeSettlement: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/expense`,
    method: Method.POST,
  }),
  getSettlementStatus: (expenseId: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/settlement-progress?expenseId=${expenseId}`,
    method: Method.GET,
  }),
  getSettlementInfo: (expenseId: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/settlement?expenseId=${expenseId}`,
    method: Method.GET,
  }),
}
