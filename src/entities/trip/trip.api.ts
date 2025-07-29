import { Method } from '@/shared/utils/fetcher'

export const trip = {
  getTripMembers: (tripId: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/trip-members?tripId=${tripId}`,
    method: Method.GET,
  }),
}
