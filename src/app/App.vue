<script setup lang="ts">
import { initFCM } from '@/initFCM'
import AppLayout from '@/layout/AppLayout.vue'
import { swReadyPromise } from '@/registerServiceWorker'
import { RouterView } from 'vue-router'

// 서비스워커는 앱 시작 시 1번만
const swRegPromise = swReadyPromise

// 이미 권한이 허용된 브라우저라면 자동 초기화
if (
  typeof window !== 'undefined' &&
  'Notification' in window &&
  Notification.permission === 'granted'
) {
  ;(async () => {
    const swReg = await swRegPromise
    await initFCM(swReg) // onMessage 리스너 붙음
  })()
}
</script>

<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>
