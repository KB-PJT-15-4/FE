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

    <ButtonMain @click="goToHome">
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
import { useRouter } from 'vue-router';

import Input from '@/shared/components/atoms/input/Input.vue'
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'

import logo from '@/assets/moa_logo.jpg'

const router = useRouter();

// 로그인 버튼 누르면 전자지갑 페이지로 이동
const goToHome = () => {
  router.push('/main/home');
};

// 회원이 아니신가요 누르면 본인인증 페이지로 이동
const goToSignup = () => {
  router.push('/certification');
};



/* 추후 데이터 작업할 코드

import axios from 'axios'

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    const response = await axios.post('보낼 백엔드 API 주소 들어갈 자리', {
      email: email.value,
      password: password.value,
    })

    const accessToken = response.data.accessToken
    // accessToken 저장 (로컬 또는 쿠키)
    localStorage.setItem('accessToken', accessToken)

    alert('로그인 성공!')
  
  } catch (error) {
    console.error('로그인 실패:', error)
    alert('로그인에 실패했습니다. 정보를 확인해주세요.')
  }
}
*/
</script>