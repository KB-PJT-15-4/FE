import router from '@/app/router'
import { createFetchClient } from './fetcher'

export const api = createFetchClient({
  baseURL: import.meta.env.VITE_APP_API_URL,
  getAccessToken: () => localStorage.getItem('accessToken'),
  onUnauthorized: () => {
    localStorage.removeItem('accessToken')
    router.replace({ name: 'login' })
  },
  timeoutMs: 15000,
  defaultCredentials: 'include',
  enableLog: import.meta.env.DEV,
})
