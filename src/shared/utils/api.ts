import router from '@/app/router'
import { createFetchClient } from './fetcher'

export const api = createFetchClient({
  getAccessToken: () => localStorage.getItem('accessToken'),
  onUnauthorized: () => {
    localStorage.removeItem('accessToken')
    alert('로그인이 만료되었습니다.\n로그인페이지로 이동합니다.')
    router.replace({ name: 'login' })
  },
  timeoutMs: 15000,
  defaultCredentials: 'include',
})
