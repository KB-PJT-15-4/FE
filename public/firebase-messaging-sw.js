// public/firebase-messaging-sw.js
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

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] 백그라운드 메시지:', payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
