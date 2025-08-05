<template>
  <div class="w-full flex flex-col gap-5 pt-20 justify-center items-center">
    <ButtonMediumMain @click="onClickCameraButton">
      QR 코드 스캔하기
    </ButtonMediumMain>
  </div>
</template>

<script setup lang="ts">
import ButtonMediumMain from '@/shared/components/atoms/button/ButtonMediumMain.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function onClickCameraButton() {
  router.push({ name: 'camera' })
}
</script>
