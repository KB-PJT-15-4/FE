<template>
  <div class="w-full">
    <SelectSmall v-model="selectedOption">
      <Option
        v-for="item in options"
        :key="item"
        :value="item"
      >
        {{ item }}
      </Option>
    </SelectSmall>
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
import Option from '@/shared/components/atoms/input/Option.vue'
import SelectSmall from '@/shared/components/atoms/input/SelectSmall.vue'
import { onMounted, ref } from 'vue'

const options = ['전체', '정산요청', '여행초대']
const selectedOption = ref(options[0])
const notifications = ref<UserNotification[]>([])

async function getNotificationsFunction() {
  try {
    notifications.value = await getNotifications(localStorage.getItem('accessToken')!)
  } catch (e) {
    console.error(e)
    alert('알림을 불러오는데 실패하였습니다.')
  }
}
onMounted(() => {
  getNotificationsFunction()
})
</script>
