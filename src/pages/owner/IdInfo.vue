<template>
  <div
    v-if="userInfo == null"
    class="w-full h-[100vh] flex flex-col items-center pt-[100px]"
  >
    <div
      class="border rounded-full bg-[#ff9090] mb-10 h-[140px] w-[140px] flex justify-center items-center"
    >
      <i class="bi bi-x text-[#d43a3a] font-extrabold text-[120px]" />
    </div>
    <TypographyHead1>유효하지 않은 QR 정보입니다</TypographyHead1>
    <ButtonMain
      class="mt-[20vh]"
      @click="router.replace({ name: 'owner' })"
    >
      <TypographyHead3> 메인으로</TypographyHead3>
    </ButtonMain>
  </div>
  <div
    v-else
    class="w-full h-[100vh] flex flex-col gap-5 items-center"
  >
    <TypographyP1>본 회원 정보는 QR 인증을 통해 확인된 신원입니다.</TypographyP1>
    <TypographyHead1 class="my-7">
      회원 주민등록증 정보
    </TypographyHead1>

    <div
      v-if="userInfo"
      class="flex flex-col items-center justify-center"
    >
      <img
        :src="userInfo.imageUrl"
        class="w-[130px] mb-4"
      >

      <TypographyHead2>{{ userInfo.name }}</TypographyHead2>
      <TypographySubTitle2 class="mt-4">
        {{ formatIdCardNumber(userInfo.idCardNumber) }}
      </TypographySubTitle2>
      <TypographySubTitle2>{{ userInfo.address }}</TypographySubTitle2>
      <TypographyHead3 class="mt-7">
        {{ formatFullDateToKorean(new Date(userInfo.issuedDate)) }}
      </TypographyHead3>
    </div>

    <ButtonMain
      class="mt-5"
      @click="router.replace({ name: 'owner' })"
    >
      <TypographyHead3> 메인으로</TypographyHead3>
    </ButtonMain>
  </div>
</template>
<script setup lang="ts">
import type { UserIDCard } from '@/entities/user/user.entity'
import { getDecodeIdQR } from '@/features/user/Owner/services/owner.service'
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import TypographyHead2 from '@/shared/components/atoms/typography/TypographyHead2.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import { formatFullDateToKorean, formatIdCardNumber } from '@/shared/utils/format'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const data = route.query.result as string

const userInfo = ref<UserIDCard | null>()

async function getDecodeQRFunction() {
  try {
    userInfo.value = await getDecodeIdQR(localStorage.getItem('accessToken')!, data)
  } catch (e) {
    console.error(e)
    userInfo.value = null
  }
}
onMounted(() => {
  getDecodeQRFunction()
})
</script>
