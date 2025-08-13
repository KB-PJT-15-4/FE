<script setup lang="ts">
import TypographyCaption from '@/shared/components/atoms/typography/TypographyCaption.vue'
import { toast } from 'vue3-toastify'
import { useNotifications } from '../model/useNotification'

const { ensure, request } = useNotifications()

ensure()

async function onClickRequest() {
  const perm = Notification.permission
  if (perm === 'granted') return

  const { status } = await request()
  if (status === 'granted') toast.info('알림이 설정되었습니다!')
  else if (status === 'denied') toast.info('설정 > Safari > 알림에서 직접 허용해주세요.')
}
</script>

<template>
  <button @click="onClickRequest">
    <TypographyCaption class="text-gray-500">
      알림 권한 요청
    </TypographyCaption>
  </button>
</template>
