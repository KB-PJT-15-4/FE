import { Method } from '@/shared/utils/fetcher'

export const user = {
  login: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/public/login`,
    method: Method.POST,
  }),
  certification: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/public/verifyJoin`,
    method: Method.POST,
  }),
  getIdByEmail: (email: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/search-by-email?email=${email}`,
    method: Method.GET,
  }),
  getValidMemberIdByEmail: (email: string, tripId: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/exist-by-email?email=${email}&tripId=${tripId}`,
    method: Method.GET,
  }),
  getIdInfo: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/my-id`,
    method: Method.GET,
  }),
  getIdQR: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/member/qr/idcard`,
    method: Method.GET,
  }),
  getDecodeIdQR: (data: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/owner/qr/idcard?data=${data}`,
    method: Method.GET,
  }),
  getDecodeReservationQR: (data: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/owner/qr/reservation?data=${data}`,
    method: Method.GET,
  }),
  getNotifications: () => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/notification`,
    method: Method.GET,
  }),
  postNotification: () => ({
    // 수락, 거절
    url: `${import.meta.env.VITE_APP_API_URL}/api/trip-notification`,
    method: Method.POST,
  }),
  readNotification: () => ({
    // 정산 읽음
    url: `${import.meta.env.VITE_APP_API_URL}/api/settle-notification`,
    method: Method.POST,
  }),
}
