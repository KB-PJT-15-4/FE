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
      <Input placeholder="이메일/사업자번호를 입력해주세요" />
      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요"
      />
    </div>

    <ButtonMain>로그인</ButtonMain>

    <TypographyP2 class="text-center text-[#000000]">
      회원이 아니신가요?
    </TypographyP2>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import Input from '@/shared/components/atoms/input/Input.vue'
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'

import logo from '@/assets/moa_logo.jpg'
</script>