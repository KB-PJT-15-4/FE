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
}
