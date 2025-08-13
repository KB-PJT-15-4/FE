import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { toast } from 'vue3-toastify'

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

function isIOSWebTab() {
  const ua = navigator.userAgent || ''
  const isiOS = /iP(hone|ad|od)/.test(ua)
  const isStandalone = window.matchMedia?.('(display-mode: standalone)').matches
  return isiOS && !isStandalone
}

async function initFCM() {
  try {
    // 현재 토큰 가져오기
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

async function requestNotificationPermission() {
  if (!(typeof window !== 'undefined' && 'Notification' in window)) {
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

async function swReadyPromise() {
  if (!('serviceWorker' in navigator)) return null
  try {
    const reg = await navigator.serviceWorker.register('/firebase-messaging-sw.js', { scope: '/' })
    await navigator.serviceWorker.ready // 활성화 대기
    console.log('[SW] 등록 성공:', reg)
    return reg
  } catch (e) {
    console.error('[SW] 등록 실패:', e)
    return null
  }
}

export {
  getToken,
  initFCM,
  isIOSWebTab,
  messaging,
  onMessage,
  requestNotificationPermission,
  swReadyPromise,
}
