<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-50 flex justify-center items-center"
  >
    <Card class="bg-white h-[500px]">
      <div class="w-full flex justify-end">
        <button @click="emit('close')">
          <i class="bi bi-x text-[30px]" />
        </button>
      </div>
      <div class="flex flex-col justify-center items-center gap-3 pb-4">
        <div class="flex flex-col justify-center text-center">
          <TypographyHead3>자동차운전면허증</TypographyHead3>
          <TypographyP2>(Driver's License)</TypographyP2>
          <TypographyP1>{{ driversLicense.licenseType }}</TypographyP1>
        </div>

        <div class="flex flex-col justify-center items-center text-center gap-3 w-full">
          <img
            :src="driversLicense.imageUrl"
            class="w-[100px] mb-4"
          >
          <div class="flex flex-col">
            <TypographyHead2 class="font-semibold">
              {{ formatDriversLicenseCardNumber(driversLicense.licenseNumber) }}
            </TypographyHead2>
            <TypographyHead3 class="font-medium">
              {{ driversLicense.name }}
            </TypographyHead3>

            <TypographyP1>{{ formatIdCardNumber(driversLicense.idCardNumber) }}</TypographyP1>
            <TypographyP2>
              기간: ~ {{ formatFullDateToKorean(new Date(driversLicense.expiryDate)) }}
            </TypographyP2>
          </div>
        </div>
        <TypographyHead3>
          {{ formatFullDateToKorean(new Date(driversLicense.issuedDate)) }}
        </TypographyHead3>
      </div>
      <div class="marquee-wrapper">
        <div class="marquee">
          <span>
            🔒 본 정보는 QR 인증을 통해 검증된 사용자 정보입니다. 정지된 화면은 무효 처리됩니다.
          </span>
          <span>
            🔒 본 정보는 QR 인증을 통해 검증된 사용자 정보입니다. 정지된 화면은 무효 처리됩니다.
          </span>
          <span>
            🔒 본 정보는 QR 인증을 통해 검증된 사용자 정보입니다. 정지된 화면은 무효 처리됩니다.
          </span>
        </div>
      </div>
    </Card>
  </div>
</template>
<script setup lang="ts">
import type { UserDriversLicenseCard } from '@/entities/user/user.entity'
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

defineProps<{
  driversLicense: UserDriversLicenseCard
}>()

const emit = defineEmits(['close'])
</script>
<style scoped>
.marquee-wrapper {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding-top: 10px;
  padding-bottom: 10px;
}

.marquee {
  display: inline-flex;
  animation: marquee 20s linear infinite;
}

.marquee span {
  padding-right: 4rem;
  font-size: 0.875rem;
  color: #666;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
