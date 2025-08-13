<script setup lang="ts">
import AppLayout from '@/layout/AppLayout.vue'
import { initFCM, isIOSWebTab } from '@/shared/utils/firebase'
import { RouterView } from 'vue-router'

// iOS Safari 웹 탭이 아닐 때만 Notification 사용
if (!isIOSWebTab() && typeof window !== 'undefined' && 'Notification' in window) {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      initFCM()
    } else {
      console.warn('알림 권한 거부됨')
    }
  })
} else {
  console.info('[알림] iOS Safari 탭 환경에서는 알림 비활성화')
}
</script>

<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>
