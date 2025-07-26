<template>
  <Card
    :key="notification.id"
    class="my-4"
  >
    <div v-if="notification.type === NotificationTye.SETTLE">
      <div class="flex gap-3">
        <i class="bi bi-wallet" />
        <TypographyP1>
          {{ notification.sender }} 님이 {{ notification.tripName }} 여행의 정산을 요청하였습니다.
        </TypographyP1>
      </div>
      <div class="flex w-full justify-end gap-2">
        <ButtonExtraSmallMain>이동</ButtonExtraSmallMain>
      </div>
    </div>

    <div v-if="notification.type === NotificationTye.TRIP">
      <div class="flex gap-3">
        <i class="bi bi-airplane" />
        <TypographyP1>
          {{ notification.sender }} 님이 {{ notification.tripName }} 여행에 초대하였습니다.
        </TypographyP1>
      </div>
      <div class="flex w-full justify-end gap-2">
        <ButtonExtraSmallMain>수락</ButtonExtraSmallMain>
        <ButtonExtraSmallSub>거절</ButtonExtraSmallSub>
      </div>
    </div>
  </Card>
</template>
<script setup lang="ts">
import { NotificationTye, type UserNotification } from '@/entities/user/user.entity'
import ButtonExtraSmallMain from '@/shared/components/atoms/button/ButtonExtraSmallMain.vue'
import ButtonExtraSmallSub from '@/shared/components/atoms/button/ButtonExtraSmallSub.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'

defineProps<{ notification: UserNotification }>()
</script>
