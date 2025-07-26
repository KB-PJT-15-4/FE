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
      v-for="(item, index) in userNotificationMockData"
      :key="index"
    >
      <NotificationCard :notification="item" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { userNotificationMockData } from '@/entities/user/user.mock'
import NotificationCard from '@/features/user/Notification/ui/NotificationCard.vue'
import Option from '@/shared/components/atoms/input/Option.vue'
import SelectSmall from '@/shared/components/atoms/input/SelectSmall.vue'
import { ref } from 'vue'

const options = ['전체', '정산요청', '여행초대']
const selectedOption = ref(options[0])
</script>
