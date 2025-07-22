<template>
  <div class="w-full h-screen flex flex-col justify-center items-center gap-8 px-6">
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
      <Input placeholder="이름을 입력해주세요" />

      <!-- input 크기 조절 필요하고, input 사이에 - 추가 필요 -->
      <div class="flex gap-1">
        <InputSmall placeholder="주민등록번호" />
        <InputSmall
          type="password"
          placeholder="*******"
        />
      </div>

      <Input placeholder="계좌번호를 입력해주세요" />

      <Input
        type="password"
        placeholder="계좌 비밀번호를 입력해주세요"
      />
    </div>

    <div class="w-full flex justify-between gap-4 mt-2">
      <ButtonMain class="w-1/2 bg-white text-[#000000]">
        취소
      </ButtonMain>
      <ButtonMain class="w-1/2">
        본인인증
      </ButtonMain>
    </div>
  </div>
</template>

<script setup>
import Input from '@/shared/components/atoms/input/Input.vue'
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'

import logo from '@/assets/moa_logo.jpg'

import InputSmall from '@/shared/components/atoms/input/InputSmall.vue'
</script>
