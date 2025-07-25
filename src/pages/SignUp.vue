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

import Input from '@/shared/components/atoms/input/Input.vue'
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import logo from '@/assets/moa_logo.jpg'

const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// 본인인증 정보 가져오기
const name = ref('')
const idCardNumber = ref('')
const accountNumber = ref('')
const accountPassword = ref('')

onMounted(() => {
  const certData = JSON.parse(localStorage.getItem('certData') || '{}')
  name.value = certData.name || ''
  idCardNumber.value = certData.idCardNumber || ''
  accountNumber.value = certData.accountNumber || ''
  accountPassword.value = certData.accountPassword || ''
})

const goToLogin = () => {
  router.push('/')
}

const handleSignup = async () => {

  // 한번더 입력한 비밀번호가 일치하지 않을 때 실행
  if (password.value !== confirmPassword.value) {
    alert('비밀번호가 일치하지 않습니다.')
    return
  }

  const signupData = {
    email: email.value,
    password: password.value,
    name: name.value,
    idCardNumber: idCardNumber.value,
    accountNumber: accountNumber.value,
    accountPassword: accountPassword.value,
  }

  try {
    const response = await fetch('http://localhost:8080/api/public/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // 세션 유지
      body: JSON.stringify(signupData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`회원가입 실패: ${response.status} - ${errorText}`)
    }

    alert('회원가입 성공!')
    localStorage.removeItem('certData') // 본인인증 데이터 제거

    router.push('/')

  } catch (error) {
    console.error('회원가입 실패:', error)
    alert('회원가입에 실패했습니다. 정보를 확인해주세요.')
  }
}
</script>


