// src/initFCM.ts
import { toast } from 'vue3-toastify'
import { getToken, messaging, onMessage } from './firebase'

export const initFCM = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
    })

    if (currentToken) {
      localStorage.setItem('fcmToken', currentToken)

      onMessage(messaging, (payload) => {
        console.log('📬 Foreground 메시지 수신:', payload)

        const { title, body } = payload.notification || {}
        if (title && body) new Notification(title, { body })
        if (title || body) toast.info(`${title ?? '알림'}\n${body ?? ''}`)
      })
    } else {
      console.warn('❌ FCM 토큰을 받아올 수 없음. 알림 권한을 허용해주세요.')
    }
  } catch (err) {
    console.error('💥 FCM 초기화 에러:', err)
  }
}
