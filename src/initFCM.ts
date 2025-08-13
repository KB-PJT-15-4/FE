// initFCM.ts
import { toast } from 'vue3-toastify'
import { getToken, messaging, onMessage } from './firebase'

let bound = false // 중복 바인딩 방지

export async function initFCM(swReg: ServiceWorkerRegistration | null) {
  if (bound) return // 이미 초기화됨
  bound = true

  try {
    // 토큰 발급(최초 1회만 필요)
    if (swReg) {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
        serviceWorkerRegistration: swReg,
      })
      if (token) localStorage.setItem('fcmToken', token)
    }

    // 포그라운드 수신 핸들러 (항상 연결)
    onMessage(messaging, (payload) => {
      const { title, body } = payload.notification || {}
      if (title || body) toast.info(`${title ?? '알림'}\n${body ?? ''}`)
    })
  } catch (err) {
    console.error('💥 FCM 초기화 에러:', err)
    bound = false // 실패 시 다시 시도 가능
  }
}
