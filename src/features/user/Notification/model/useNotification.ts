import { initFCM } from '@/shared/utils/firebase'

export function useNotifications() {
  const canNotify = 'Notification' in window

  async function ensure() {
    if (!canNotify) return { status: 'unsupported' as const }

    const perm = Notification.permission
    if (perm === 'granted') {
      await initFCM()
      return { status: 'granted' as const }
    }
    if (perm === 'denied') return { status: 'denied' as const }
    return { status: 'prompt' as const }
  }

  async function request() {
    if (!canNotify) return { status: 'unsupported' as const }
    const p = await Notification.requestPermission()
    if (p === 'granted') {
      await initFCM()
      return { status: 'granted' as const }
    }
    return { status: p === 'denied' ? ('denied' as const) : ('default' as const) }
  }

  return { ensure, request }
}
