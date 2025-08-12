<template>
  <div class="w-full h-dvh flex flex-col pt-20 items-center gap-8 overflow-hidden">
    <img
      :src="logo"
      alt="moa logo"
      class="w-[103px] h-[54.65px] object-contain"
    >

    <TypographyHead3>
      <span class="font-inter">우리의 여행을 </span>
      <span class="text-[#87BFFF] font-inter">MOA</span>
    </TypographyHead3>

    <form
      class="w-full flex flex-col gap-4"
      novalidate
      @submit.prevent="handleLogin"
    >
      <Input
        v-model="email"
        name="email"
        type="text"
        autocomplete="username"
        autocapitalize="off"
        spellcheck="false"
        placeholder="이메일 또는 사업자번호를 입력해주세요"
        class="text-[16px]"
      />
      <Input
        v-model="password"
        name="password"
        autocomplete="current-password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        class="text-[16px]"
      />
      <ButtonMain class="mt-5">
        <TypographyHead3>로그인</TypographyHead3>
      </ButtonMain>
    </form>
    <TypographyP2
      class="text-center cursor-pointer"
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

  try {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/public/login`, {
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

    const accessToken = data.token
    const name = data.user.username
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('name', name)

    if (email.value.includes('@')) {
      router.replace({ name: 'home' })
    } else {
      router.replace({ name: 'owner' })
    }
  } catch (error) {
    alert('로그인에 실패했습니다. 정보를 확인해주세요.')
  }
  return
}

// 본인인증 페이지로 이동
const goToSignup = () => {
  router.push({ name: 'certification' })
}
</script>
