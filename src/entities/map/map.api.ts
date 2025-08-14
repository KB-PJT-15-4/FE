import { Method } from '@/shared/utils/fetcher'

export const map = {
  getTripLocations: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/trip-locations`,
    method: Method.GET,
  }),
  getTrips: (page: number, size: number, locationName?: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/trips?page=${page}&size=${size}${
      locationName ? `&locationName=${encodeURIComponent(locationName)}` : ''
    }`,
    method: Method.GET,
  }),
}
