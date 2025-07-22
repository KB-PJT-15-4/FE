<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-50 flex justify-center items-center"
  >
    <Card class="bg-white">
      <div class="w-full flex justify-end">
        <button @click="emit('close')">
          <i class="bi bi-x text-[30px]" />
        </button>
      </div>
      <div class="flex flex-col justify-center items-center gap-3 pb-9">
        <TypographyHead1>운전면허증</TypographyHead1>
        <img
          :src="idCard.imageUrl"
          class="w-[130px] mb-4"
        >
        <div class="flex flex-col justify-center text-center gap-3 w-full">
          <TypographyHead3>{{ idCard.name }}</TypographyHead3>
          <TypographySubTitle2>생년월일</TypographySubTitle2>
          <TypographyP1>{{ formatFullDateToKorean(new Date(idCard.birth)) }}</TypographyP1>
        </div>
      </div>
    </Card>
  </div>
</template>
<script setup>
import { userDriversLicenseMockData } from '@/entities/user/user.mock'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import { formatFullDateToKorean } from '@/shared/utils/format'
import { defineEmits } from 'vue'

const emit = defineEmits(['close'])
const idCard = userDriversLicenseMockData
</script>
