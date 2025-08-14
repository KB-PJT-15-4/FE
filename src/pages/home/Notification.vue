<template>
  <div class="w-full">
    <div
      v-for="(item, index) in notifications"
      :key="index"
    >
      <NotificationCard :notification="item" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { UserNotification } from '@/entities/user/user.entity'
import { getNotifications } from '@/features/user/Notification/services/notification.service'
import NotificationCard from '@/features/user/Notification/ui/NotificationCard.vue'
import { onMounted, ref } from 'vue'

const notifications = ref<UserNotification[]>([])

async function getNotificationsFunction() {
  try {
    notifications.value = await getNotifications()
  } catch (e) {
    console.error(e)
    alert('알림을 불러오는데 실패하였습니다.')
  }
}

onMounted(() => {
  getNotificationsFunction()
})
</script>
