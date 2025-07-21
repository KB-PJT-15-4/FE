<script setup lang="ts">
import AppLayout from '@/layout/AppLayout.vue'
import { RouterView } from 'vue-router'

// import AppLayout from '@/layouts/AppLayout.vue' ← 나중에 레이아웃 생기면
</script>

<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>

<style scoped>
/* 기본 비움 */
</style>
