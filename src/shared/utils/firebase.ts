import { initializeApp } from 'firebase/app'
import { getToken as _getToken, onMessage as _onMessage, getMessaging } from 'firebase/messaging'
import { toast } from 'vue3-toastify'

// ---- Firebase Init (한 번만) ----
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
}
const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

// ---- 유틸 ----
export function isIOSWebTab() {
  const ua = navigator.userAgent || ''
  const isiOS = /iP(hone|ad|od)/.test(ua)
  const isStandalone = window.matchMedia?.('(display-mode: standalone)').matches
  return isiOS && !isStandalone
}

export const swReadyPromise = (async () => {
  if (!('serviceWorker' in navigator)) return null
  try {
    const reg = await navigator.serviceWorker.register('/firebase-messaging-sw.js', { scope: '/' })
    await navigator.serviceWorker.ready
    console.log('[SW] 등록 성공:', reg)
    return reg
  } catch (e) {
    console.error('[SW] 등록 실패:', e)
    return null
  }
})()

let bound = false

export async function initFCM() {
  try {
    // 1) SW 준비 후 토큰 요청
    const swReg = await swReadyPromise

    const token = await _getToken(messaging, {
      vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
      serviceWorkerRegistration: swReg ?? undefined,
    })

    if (token) {
      localStorage.setItem('fcmToken', token)
    } else {
      console.warn('❌ FCM 토큰을 받아올 수 없음. 알림 권한을 허용해주세요.')
    }

    // 2) 포그라운드 수신 → 토스트 (중복 바인딩 방지)
    if (!bound) {
      bound = true
      _onMessage(messaging, (payload) => {
        const { title, body } = payload.notification || {}
        if (title || body) toast.info(`${title ?? '알림'}\n${body ?? ''}`)
        if ('Notification' in window && Notification.permission === 'granted' && title && body) {
          new Notification(title, { body })
        }
      })
    }
  } catch (err) {
    bound = false
    console.error('💥 FCM 초기화 에러:', err)
  }
}

export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.info('이 환경은 Notification API를 지원하지 않아요.')
    return
  }
  const permission = await Notification.requestPermission()
  if (permission !== 'granted') {
    console.warn('알림 권한 거부됨')
    return
  }
  await initFCM()
}

export const getToken = _getToken
export const onMessage = _onMessage
export { messaging }
