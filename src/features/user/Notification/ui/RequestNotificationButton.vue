<script setup lang="ts">
import TypographyCaption from '@/shared/components/atoms/typography/TypographyCaption.vue'

import { useNotifications } from '../model/useNotification'

const { ensure, request } = useNotifications()

ensure()

async function onClickRequest() {
  const perm = Notification.permission
  if (perm === 'granted') return

  await request()
}
</script>

<template>
  <button @click="onClickRequest">
    <TypographyCaption class="text-gray-500">
      알림 권한 요청
    </TypographyCaption>
  </button>
</template>
