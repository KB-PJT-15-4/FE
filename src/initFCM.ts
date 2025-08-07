// src/initFCM.ts
import { getToken, messaging, onMessage } from './firebase'

export const initFCM = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
    })

    if (currentToken) {
      console.log('📱 FCM Token:', currentToken)

      // 👇 포그라운드 메시지 수신 콜백 등록
      onMessage(messaging, (payload) => {
        console.log('📬 Foreground 메시지 수신:', payload)

        // 필요 시 사용자에게 알림 표시
        const { title, body } = payload.notification || {}
        if (title && body) {
          new Notification(title, { body })
        }
      })
    } else {
      console.warn('❌ FCM 토큰을 받아올 수 없음. 알림 권한을 허용해주세요.')
    }
  } catch (err) {
    console.error('💥 FCM 초기화 에러:', err)
  }
}
