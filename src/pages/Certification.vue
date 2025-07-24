<template>
  <div class="w-full h-screen flex flex-col justify-center items-center gap-8">
    <img
      :src="logo"
      alt="moa logo"
      class="w-[103px] h-[54.65px] object-contain"
    >

    <TypographyHead3>
      <span class="font-inter">우리의 여행을 </span>
      <span class="text-[#87BFFF] font-inter">MOA</span>
    </TypographyHead3>

    <div class="w-full flex flex-col gap-4">
      <Input
        v-model="name"
        placeholder="이름을 입력해주세요"
      />

      <!-- 배열 다시 해야함 -->
      <div class="w-full flex items-center">
        <div class="w-[45%]">
          <InputSmall
            v-model="rrnFront"
            placeholder="주민등록번호 앞자리"
          />
        </div>
        <div class="w-[10%] text-center text-lg text-[#999999]">
          -
        </div>
        <div class="w-[45%]">
          <InputSmall
            v-model="rrnBack"
            type="password"
            placeholder="*******"
          />
        </div>
      </div>

      <Input
        v-model="accountNumber"
        placeholder="계좌번호를 입력해주세요"
      />

      <Input
        v-model="accountPassword"
        class="w-[60%]"
        type="password"
        placeholder="계좌 비밀번호를 입력해주세요"
      />
    </div>

    <div class="w-full flex justify-between gap-4">
      <ButtonMain
        class="w-1/2 bg-white !text-[#000000]"
        @click="goToLogin"
      >
        취소
      </ButtonMain>
      <ButtonMain
        class="w-1/2"
        @click="goToSignup"
      >
        본인인증
      </ButtonMain>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import Input from '@/shared/components/atoms/input/Input.vue'
import InputSmall from '@/shared/components/atoms/input/InputSmall.vue'
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import logo from '@/assets/moa_logo.jpg'

const router = useRouter()

const name = ref('')
const rrnFront = ref('') // 주민등록번호 앞자리
const rrnBack = ref('') // 주민등록번호 뒷자리
const accountNumber = ref('')
const accountPassword = ref('')

const goToLogin = () => {
  router.push('/')
}

const goToSignup = async () => {
  const authData = {
    name: name.value,
    rrn: `${rrnFront.value}-${rrnBack.value}`,
    accountNumber: accountNumber.value,
    accountPassword: accountPassword.value,
  }

  try {
    // api 수정
    await axios.post('https://your-api-domain.com/api/auth/certification', authData)

    localStorage.setItem('certData', JSON.stringify(authData))

    router.push('/signup')
  } catch (error) {
    console.error('본인인증 실패:', error)
    alert('본인인증에 실패했습니다. 정보를 확인해주세요.')
  }
}
</script>
