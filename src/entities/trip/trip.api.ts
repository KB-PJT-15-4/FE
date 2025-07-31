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
}
