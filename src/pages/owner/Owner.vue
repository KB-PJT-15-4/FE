<template>
  <div class="w-full h-[100vh] flex flex-col gap-5 justify-center items-center mt-6">
    <TypographySubTitle1>{{ name }} 사장님, 반갑습니다 👋</TypographySubTitle1>
    <div class="flex flex-col mb-3 mt-12">
      <TypographyHead1>MOA 사장님 페이지 </TypographyHead1>
      <TypographySubTitle1 class="text-moa-sub-text">
        예약 등록 및 예약 확인을 빠르게
      </TypographySubTitle1>
    </div>

    <div class="h-full w-full flex flex-col justify-start items-center p-5">
      <div class="flex w-full gap-4 justify-between">
        <button
          class="w-full bg-moa-main p-6 h-[130px] text-white rounded-md flex flex-col gap-4 justify-center items-center mb-6"
          @click="onClickIdCameraButton"
        >
          <i class="bi bi-qr-code-scan text-[30px]" />
          <TypographySubTitle1>
            PASS<br>
            QR 코드 스캔
          </TypographySubTitle1>
        </button>
        <button
          class="w-full bg-moa-main p-6 h-[130px] text-white rounded-md flex flex-col gap-4 justify-center items-center mb-6"
          @click="onClickReservationCameraButton"
        >
          <i class="bi bi-qr-code-scan text-[30px]" />
          <TypographySubTitle1>
            예약권<br>
            QR 코드 스캔
          </TypographySubTitle1>
        </button>
      </div>
      <TypographySubTitle2>고객의 QR 코드를 스캔하여 </TypographySubTitle2>
      <TypographySubTitle2>예매 정보를 확인하세요</TypographySubTitle2>
    </div>
  </div>
</template>

<script setup lang="ts">
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = localStorage.getItem('name')

function onClickIdCameraButton() {
  router.push({ name: 'id_camera' })
}

function onClickReservationCameraButton() {
  router.push({ name: 'reservation_camera' })
}
</script>
