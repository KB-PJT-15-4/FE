<script setup lang="ts">
import { initFCM } from '@/initFCM'
import AppLayout from '@/layout/AppLayout.vue'
import { RouterView } from 'vue-router'

Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    initFCM()
  } else {
    console.warn('알림 권한 거부됨')
  }
})
</script>

<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>

<style scoped>
/* 기본 비움 */
</style>
