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
        placeholder="이메일/사업자번호를 입력해주세요"
      />

      <Input
        v-model="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
      />
    </div>

    <ButtonMain @click="handleLogin">
      로그인
    </ButtonMain>

    <TypographyP2
      class="text-center text-[#000000]"
      @click="goToSignup"
    >
      회원이 아니신가요?
    </TypographyP2>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import logo from '@/assets/moa_logo.jpg'
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import Input from '@/shared/components/atoms/input/Input.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'

const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const context = {
    email: email.value,
    password: password.value,
  }
  console.log('요청 데이터:', context)

  try {
    const response = await fetch(`http://localhost:8080/api/public/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // 쿠키 포함
      body: JSON.stringify(context),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`HTTP ${response.status} - ${errorBody}`)
    }

    const data = await response.json()
    console.log('서버 응답:', data)

    const accessToken = data.token
    localStorage.setItem('accessToken', accessToken)

    alert('로그인 성공!')
    router.push({ name: 'home' })
  } catch (error) {
    console.error('로그인 실패:', error.message)
    alert('로그인에 실패했습니다. 정보를 확인해주세요.')
  }
}

// 본인인증 페이지로 이동
const goToSignup = () => {
  router.push({ name: 'certification' })
}
</script>
