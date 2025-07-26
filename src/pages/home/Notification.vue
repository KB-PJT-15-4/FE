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
    <Card
      v-for="(item, index) in userNotificationMockData"
      :key="index"
      class="my-4"
    >
      <div v-if="item.type === NotificationTye.SETTLE">
        <div class="flex gap-3">
          <i class="bi bi-wallet" />
          <TypographyP1>
            {{ item.sender }} 님이 {{ item.tripName }} 여행의 정산을 요청하였습니다.
          </TypographyP1>
        </div>
        <div class="flex w-full justify-end gap-2">
          <ButtonExtraSmallMain>이동</ButtonExtraSmallMain>
        </div>
      </div>

      <div v-if="item.type === NotificationTye.TRIP">
        <div class="flex gap-3">
          <i class="bi bi-airplane" />
          <TypographyP1>
            {{ item.sender }} 님이 {{ item.tripName }} 여행에 초대하였습니다.
          </TypographyP1>
        </div>
        <div class="flex w-full justify-end gap-2">
          <ButtonExtraSmallMain>수락</ButtonExtraSmallMain>
          <ButtonExtraSmallSub>거절</ButtonExtraSmallSub>
        </div>
      </div>
    </Card>
  </div>
</template>
<script setup lang="ts">
import { NotificationTye } from '@/entities/user/user.entity'
import { userNotificationMockData } from '@/entities/user/user.mock'
import ButtonExtraSmallMain from '@/shared/components/atoms/button/ButtonExtraSmallMain.vue'
import ButtonExtraSmallSub from '@/shared/components/atoms/button/ButtonExtraSmallSub.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import Option from '@/shared/components/atoms/input/Option.vue'
import SelectSmall from '@/shared/components/atoms/input/SelectSmall.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import { ref } from 'vue'

const options = ['전체', '정산요청', '여행초대']
const selectedOption = ref(options[0])
</script>
