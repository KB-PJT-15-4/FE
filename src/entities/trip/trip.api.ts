import { Method } from '@/shared/utils/fetcher'

export const trip = {
  createTrip: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/trips`,
    method: Method.POST,
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
    url: `${import.meta.env.VITE_APP_API_URL}/api/member/reservation/restaurant/category`,
    method: Method.GET,
  }),
  getAvailableTimeList: (restId: string, date: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/member/reservation/restaurant/${restId}/times?date=${date}`,
    method: Method.GET,
  }),
  reservationRestaurant: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/member/reservation/restaurant`,
    method: Method.POST,
  }),
  getMemberList: (tripId: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/trip-members?tripId=${tripId}`,
    method: Method.GET,
  }),
  getSettleList: (tripId: string, page: number, size: number) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/expense?tripId=${tripId}&page=${page}&size=${size}`,
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
  postSettle: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/settlement`,
    method: Method.POST,
  }),
  getSeatsStatus: (transportId: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/member/reservation/transport/seats?transportId=${transportId}`,
    method: Method.GET,
  }),
  selectSeat: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/member/reservation/transport/seats`,
    method: Method.POST,
  }),
  reservationTransportation: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/member/reservation/transport/pay`,
    method: Method.POST,
  }),
  cancelTransportReservation: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/member/reservation/transport/cancel`,
    method: Method.POST,
  }),
  getAccommodationInfo: (accomId: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/member/reservation/accommodation-detail?accomId=${accomId}`,
    method: Method.GET,
  }),
  getRoomList: (
    tripId: string,
    accomId: string,
    checkinDay: string,
    checkoutDay: string,
    guests: number
  ) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/member/reservation/accommodation-rooms?accomId=${accomId}&tripId=${tripId}&checkinDay=${checkinDay}&checkoutDay=${checkoutDay}&guests=${guests}`,
    method: Method.GET,
  }),
  getRestaurantInfo: (restId: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/member/reservation/restaurant/restId?restId=${restId}`,
    method: Method.GET,
  }),
  reservationAccommodation: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/member/reservation/accommodation`,
    method: Method.POST,
  }),
  getReservationList: (tripId: number, resKind: string | null, page: number, size: number) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/member/reservation?tripId=${tripId}${
      resKind ? `&resKind=${resKind}` : ''
    }&page=${page}&size=${size}`,
    method: Method.GET,
  }),
  getReservationQr: (itemId: number) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/member/qr/reservation?reservationId=${itemId}`,
    method: Method.GET,
  }),
  getTripInfo: (tripId: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/trip-detail?tripId=${tripId}`,
    method: Method.GET,
  }),
  inviteMembers: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/trips/member`,
    method: Method.POST,
  }),
  getUpcomingTrip: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/trips/upcoming`,
    method: Method.GET,
  }),
}
