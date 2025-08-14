<template>
  <div
    :key="notification.notificationId"
    class="my-4 py-2"
  >
    <div v-if="notification.notificationType === NotificationType.SETTLE">
      <div class="flex gap-3 items-center">
        <div class="border min-w-[45px] h-[45px] flex justify-center items-center rounded-full">
          <i class="bi bi-wallet text-lg" />
        </div>
        <TypographyP2>
          {{ notification.sender }} 님이 {{ notification.tripName }} 여행의 정산을 요청하였습니다.
        </TypographyP2>
        <ButtonExtraSmallMain
          class="h-[40px] min-w-[100px]"
          @click="() => readNotificationFunction(notification.tripId, notification.notificationId)"
        >
          이동
        </ButtonExtraSmallMain>
      </div>
    </div>

    <div v-if="notification.notificationType === NotificationType.TRIP">
      <div class="flex gap-3 items-center">
        <div class="border min-w-[45px] h-[45px] flex justify-center items-center rounded-full">
          <i class="bi bi-airplane text-lg" />
        </div>
        <TypographyP2>
          {{ notification.sender }} 님이 {{ notification.tripName }} 여행에 초대하였습니다.
        </TypographyP2>
        <ButtonExtraSmallMain
          class="h-[40px] min-w-[100px]"
          @click="
            () => postNotificationFunction('수락', notification.tripId, notification.notificationId)
          "
        >
          <TypographyP1>수락</TypographyP1>
        </ButtonExtraSmallMain>
        <!-- <button
          @click="
            () => postNotificationFunction('거절', notification.tripId, notification.notificationId)
          "
        >
          <i class="bi bi-x text-[20px]" />
        </button> -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NotificationType, type UserNotification } from '@/entities/user/user.entity'
import ButtonExtraSmallMain from '@/shared/components/atoms/button/ButtonExtraSmallMain.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import { useRouter } from 'vue-router'
import { postNotification, readNotification } from '../services/notification.service'

defineProps<{ notification: UserNotification }>()
const router = useRouter()

async function postNotificationFunction(type: string, tripId: number, notificationId: number) {
  try {
    if (type === '수락') {
      if (window.confirm('여행 초대 알림을 수락하시겠습니까?')) {
        await postNotification(type, tripId, notificationId)
        alert('여행 초대 수락이 완료되었습니다.\n여행 페이지로 이동합니다.')
        router.replace({ name: 'trip_detail', params: { tripId: tripId } })
      }
    }

    if (type === '거절') {
      if (window.confirm('여행 초대 알림을 거절하시겠습니까?')) {
        await postNotification(type, tripId, notificationId)
        alert('여행 초대 거절이 완료되었습니다.')
        router.go(0)
      }
    }
  } catch (e) {
    console.error(e)
    alert(`여행 ${type}을 완료하지 못하였습니다.`)
  }
}

async function readNotificationFunction(tripId: number, notificationId: number) {
  try {
    if (window.confirm('정산 페이지로 이동하시겠습니까?')) {
      await readNotification(tripId, notificationId)
      router.replace({ name: 'trip_detail', params: { tripId: tripId }, query: { tab: 'settle' } })
    }
  } catch (e) {
    console.error(e)
    alert('정산 페이지로 이동하지 못하였습니다.')
  }
}
</script>
