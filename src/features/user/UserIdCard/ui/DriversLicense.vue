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
        <div class="flex flex-col justify-center text-center">
          <TypographyHead3>자동차운전면허증</TypographyHead3>
          <TypographyP2>(Driver's License)</TypographyP2>
          <TypographyP1>{{ idCard.licenseType }}</TypographyP1>
        </div>

        <div class="flex flex-col justify-center items-center text-center gap-3 w-full">
          <img
            :src="idCard.imageUrl"
            class="w-[100px] mb-4"
          >
          <div class="flex flex-col">
            <TypographyHead2 class="font-semibold">
              {{
                formatDriversLicenseCardNumber(idCard.licenseNumber)
              }}
            </TypographyHead2>
            <TypographyHead3 class="font-medium">
              {{ idCard.name }}
            </TypographyHead3>

            <TypographyP1>{{ formatIdCardNumber(idCard.idCardNumber) }}</TypographyP1>
            <TypographyP2>
              기간: ~ {{ formatFullDateToKorean(new Date(idCard.expiryDate)) }}
            </TypographyP2>
          </div>
        </div>
        <TypographyHead3>{{ formatFullDateToKorean(new Date(idCard.issueDate)) }}</TypographyHead3>
      </div>
    </Card>
  </div>
</template>
<script setup>
import { userDriversLicenseMockData } from '@/entities/user/user.mock'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyHead2 from '@/shared/components/atoms/typography/TypographyHead2.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import {
  formatDriversLicenseCardNumber,
  formatFullDateToKorean,
  formatIdCardNumber,
} from '@/shared/utils/format'
import { defineEmits } from 'vue'

const emit = defineEmits(['close'])
const idCard = userDriversLicenseMockData
</script>
