// src/registerServiceWorker.ts
export const swReadyPromise = (async () => {
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
})()
