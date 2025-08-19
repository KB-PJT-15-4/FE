importScripts('https://www.gstatic.com/firebasejs/10.5.2/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.5.2/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: 'AIzaSyCuSJLbPgi5aQTwXMHgquPu04ARm8y2vTI',
  authDomain: 'kb-pjt-moa.firebaseapp.com',
  projectId: 'kb-pjt-moa',
  storageBucket: 'kb-pjt-moa.firebasestorage.app',
  messagingSenderId: '915835312343',
  appId: '1:915835312343:web:2773f133ac070920657892',
  measurementId: 'G-221FV6V79G',
})

const messaging = firebase.messaging()

// 1) notification payload가 있는 경우 (백그라운드)
messaging.onBackgroundMessage((payload) => {
  const title = payload?.notification?.title || '알림'
  const body = payload?.notification?.body || ''
  const icon = payload?.notification?.icon || '/icons/icon-192x192.png'
  const data = payload?.data || {}

  self.registration.showNotification(title, { body, icon, data })
})

// // 2) data-only 메시지 처리 (서버가 data만 보낼 때)
// self.addEventListener('push', (event) => {
//   if (!event.data) return
//   const payload = event.data.json()

//   const n = payload?.notification || {}
//   const d = payload?.data || {}

//   const title = n.title || d.title || '알림'
//   const body = n.body || d.body || ''
//   const icon = n.icon || d.icon || '/icons/icon-192x192.png'

//   event.waitUntil(self.registration.showNotification(title, { body, icon, data: d }))
// })

self.addEventListener('notificationclick', (e) => {
  e.notification.close()
  const url = e.notification?.data?.click_action || self.location.origin + '/'

  e.waitUntil(
    (async () => {
      const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      const existing = allClients.find((c) => c.url.startsWith(self.location.origin))
      if (existing) return existing.focus()
      return self.clients.openWindow(url)
    })()
  )
})
