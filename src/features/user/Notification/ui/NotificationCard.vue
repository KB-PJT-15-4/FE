<template>
  <Card
    :key="notification.notificationId"
    class="my-4"
  >
    <div v-if="notification.notificationType === NotificationType.SETTLE">
      <div class="flex gap-3 items-center">
        <i class="bi bi-wallet text-lg" />
        <TypographyP1>
          {{ notification.sender }} 님이 {{ notification.tripName }} 여행의 정산을 요청하였습니다.
        </TypographyP1>
      </div>
      <div class="flex w-full justify-end gap-2 mt-2">
        <ButtonExtraSmallMain>이동</ButtonExtraSmallMain>
      </div>
    </div>

    <div v-if="notification.notificationType === NotificationType.TRIP">
      <div class="flex gap-3 items-center">
        <i class="bi bi-airplane text-lg" />
        <TypographyP1>
          {{ notification.sender }} 님이 {{ notification.tripName }} 여행에 초대하였습니다.
        </TypographyP1>
      </div>
      <div class="flex w-full justify-end gap-2 mt-2">
        <ButtonExtraSmallMain
          @click="
            () => postNotificationFunction('수락', notification.tripId, notification.notificationId)
          "
        >
          수락
        </ButtonExtraSmallMain>
        <ButtonExtraSmallSub
          @click="
            () => postNotificationFunction('거절', notification.tripId, notification.notificationId)
          "
        >
          거절
        </ButtonExtraSmallSub>
      </div>
    </div>
  </Card>
</template>
<script setup lang="ts">
import { NotificationType, type UserNotification } from '@/entities/user/user.entity'
import ButtonExtraSmallMain from '@/shared/components/atoms/button/ButtonExtraSmallMain.vue'
import ButtonExtraSmallSub from '@/shared/components/atoms/button/ButtonExtraSmallSub.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import { useRouter } from 'vue-router'
import { postNotification } from '../services/notification.service'

defineProps<{ notification: UserNotification }>()
const router = useRouter()

async function postNotificationFunction(type: string, tripId: number, notificationId: number) {
  try {
    if (type === '수락') {
      if (window.confirm('여행 초대 알림을 수락하시겠습니까?')) {
        await postNotification(localStorage.getItem('accessToken')!, type, tripId, notificationId)
        alert('여행 초대 수락이 완료되었습니다.\n여행 페이지로 이동합니다.')
        router.replace({ name: 'trip_detail', params: { tripId: tripId } })
      }
    } else {
      if (window.confirm('여행 초대 알림을 거절하시겠습니까?')) {
        await postNotification(localStorage.getItem('accessToken')!, type, tripId, notificationId)
        alert('여행 초대 거절이 완료되었습니다.')
      }
    }
  } catch (e) {
    console.error(e)
    alert(`여행 ${type}을 완료하지 못하였습니다.`)
  }
}
</script>
