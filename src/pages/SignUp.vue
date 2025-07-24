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
        v-model="email"
        placeholder="이메일을 입력해주세요"
      />
      <Input
        v-model="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
      />
      <Input
        v-model="confirmPassword"
        type="password"
        placeholder="비밀번호를 한번 더 입력해주세요"
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
        @click="handleSignup"
      >
        회원가입
      </ButtonMain>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import Input from '@/shared/components/atoms/input/Input.vue'
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import logo from '@/assets/moa_logo.jpg'

const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// 본인인증 데이터
const name = ref('')
const rrn = ref('')
const accountNumber = ref('')
const accountPassword = ref('')

onMounted(() => {
  const certData = JSON.parse(localStorage.getItem('certData') || '{}')
  name.value = certData.name || ''
  rrn.value = certData.rrn || ''
  accountNumber.value = certData.accountNumber || ''
  accountPassword.value = certData.accountPassword || ''
})

const goToLogin = () => {
  router.push('/')
}

const handleSignup = async () => {
  if (password.value !== confirmPassword.value) {
    alert('비밀번호가 일치하지 않습니다.')
    return
  }

  try {
    // api 수정
    await axios.post('http://localhost:8080/', {
      email: email.value,
      password: password.value,
      name: name.value,
      rrn: rrn.value,
      accountNumber: accountNumber.value,
      accountPassword: accountPassword.value,
    })

    alert('회원가입 성공!')
    router.push('/')
  } catch (error) {
    console.error('회원가입 실패:', error)
    alert('회원가입에 실패했습니다.')
  }
}
</script>

