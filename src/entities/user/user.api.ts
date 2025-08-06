import { Method } from '@/shared/utils/fetcher'

export const user = {
  getIdByEmail: (email: string) => ({
    url: `${import.meta.env.VITE_APP_API_URL}/api/search-by-email?email=${email}`,
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
    url: `${import.meta.env.VITE_APP_API_URL}/api/public/qr/idcard?data=${data}`,
    method: Method.GET,
  }),
}
