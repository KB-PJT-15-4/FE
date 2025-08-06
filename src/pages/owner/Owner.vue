<template>
  <div class="w-full h-[100vh] flex flex-col gap-5 justify-center items-center mt-6">
    <TypographySubTitle1>다모아 호텔 사장님, 반갑습니다 👋</TypographySubTitle1>
    <div class="flex flex-col mb-3 mt-12">
      <TypographyHead1>MOA 사장님 페이지 </TypographyHead1>
      <TypographySubTitle1 class="text-moa-sub-text">
        예약 등록 및 예약 확인을 빠르게
      </TypographySubTitle1>
    </div>

    <div class="h-full w-full flex flex-col justify-start items-center p-5">
      <button
        class="bg-moa-main p-6 h-[130px] text-white rounded-md flex flex-col gap-4 justify-center items-center mb-6"
        @click="onClickCameraButton"
      >
        <i class="bi bi-qr-code-scan text-[30px]" />
        <TypographySubTitle1>QR 코드 스캔하기</TypographySubTitle1>
      </button>
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

function onClickCameraButton() {
  router.push({ name: 'camera' })
}
</script>
