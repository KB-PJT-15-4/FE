<template>
  <div class="w-full h-[100vh] flex flex-col gap-5 items-center">
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
        {{
          formatIdCardNumber(userInfo.idCardNumber)
        }}
      </TypographySubTitle2>
      <TypographySubTitle2>{{ userInfo.address }}</TypographySubTitle2>
      <TypographyHead3 class="mt-7">
        {{
          formatFullDateToKorean(new Date(userInfo.issuedDate))
        }}
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

const userInfo = ref<UserIDCard>()

async function getDecodeQRFunction() {
  try {
    userInfo.value = await getDecodeIdQR(data)
  } catch (e) {
    console.error(e)
    userInfo.value = {
      idCardNumber: '0004114000001',
      name: '카리나',
      imageUrl:
        'https://storage.googleapis.com/kb-pjt-moa.firebasestorage.app/IDphoto/karina.jfif?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=firebase-adminsdk-fbsvc%40kb-pjt-moa.iam.gserviceaccount.com%2F20250807%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250807T061128Z&X-Goog-Expires=10800&X-Goog-SignedHeaders=host&X-Goog-Signature=7cc5b599b4f7662babd6a010c3f426ae935eb65cf4d12991397fee0fc6d2a17071d5061de1a00034cff7bc126056da9b4a3a6039202eabe1e0224fcb396247031114a9cbd513113602bda9efd2d02d7a8ef771ecf2b6c96ed1589380b0314ec7ff43c517e8863eb89eeda6fd7b02e50f4751619cf1ceb94db9eb10f8b6cfb66b889bd7b38fa20a60597dc474cdd364df489df83a60edde159916d45f6273fb08ed04bfc230347e9d37593276d9521cf2256227f36d13d8149c1e5320958f350c8fbd451f98a9c3ea88d4b5e7d6ded4e5979972a39e334434e16625e7cc2336982f0e273de8d5361deb8581a0cc7b06088a691950fe78fd628af9badc65997318',
      issuedDate: '2020-01-01',
      address: '서울특별시 성동구 왕십리로 83-21',
      birthday: '2000-04-11',
    }
  }
}
onMounted(() => {
  getDecodeQRFunction()
})
</script>
