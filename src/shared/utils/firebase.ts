import { initializeApp } from 'firebase/app'
import { getToken as _getToken, onMessage as _onMessage, getMessaging } from 'firebase/messaging'

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

export function isIOSWebTab() {
  const ua = navigator.userAgent || ''
  const isiOS = /iP(hone|ad|od)/.test(ua)
  const isStandalone = window.matchMedia?.('(display-mode: standalone)').matches
  return isiOS && !isStandalone
}

export async function initFCM() {
  // 1) 포그라운드 수신
  _onMessage(messaging, (payload) => {
    const { title, body } = payload.notification || {}

    if ('Notification' in window && Notification.permission === 'granted' && title && body) {
      new Notification(title, { body })
    }
  })

  // 2) 토큰 발급
  try {
    if (!('serviceWorker' in navigator)) return
    const reg = await navigator.serviceWorker.ready
    const token = await _getToken(messaging, {
      vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
      serviceWorkerRegistration: reg,
    })
    if (token) {
      localStorage.setItem('fcmToken', token)
      console.log('FCM Token', token)
    } else {
      console.warn('❌ FCM 토큰을 받아올 수 없음. 알림 권한을 허용해주세요.')
    }
  } catch (err) {
    console.error('💥 FCM 토큰 발급 실패:', err)
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
