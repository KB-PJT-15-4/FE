<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-50 flex justify-center items-center"
  >
    <Card class="bg-white h-[480px]">
      <div class="w-full flex justify-end">
        <button @click="emit('close')">
          <i class="bi bi-x text-[30px]" />
        </button>
      </div>
      <div class="flex flex-col justify-center items-center gap-3 pb-9">
        <TypographyHead1>주민등록증</TypographyHead1>

        <img
          :src="idCard.imageUrl"
          class="w-[130px] mb-4"
        >
        <div class="text-center">
          <TypographyHead2>{{ idCard.name }}</TypographyHead2>
          <TypographySubTitle2>{{ formatIdCardNumber(idCard.idCardNumber) }}</TypographySubTitle2>
          <TypographySubTitle2>{{ idCard.address }}</TypographySubTitle2>
        </div>
        <!-- <qrcode-vue :value="idCard.qrUrl" :size="100" /> -->

        <TypographyHead3>{{ formatFullDateToKorean(new Date(idCard.issueDate)) }}</TypographyHead3>
      </div>
    </Card>
  </div>
</template>
<script setup>
import { userIdCardMockData } from '@/entities/user/user.mock'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import TypographyHead2 from '@/shared/components/atoms/typography/TypographyHead2.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import { formatFullDateToKorean, formatIdCardNumber } from '@/shared/utils/format'
import { defineEmits } from 'vue'

const emit = defineEmits(['close'])
const idCard = userIdCardMockData
</script>
