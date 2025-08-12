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

    <div class="w-full flex flex-col gap-4 px-4">
      <Input
        v-model="email"
        name="email"
        autocomplete="email"
        placeholder="이메일을 입력해주세요"
      />
      <Input
        v-model="password"
        name="password"
        autocomplete="new-password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
      />
      <Input
        v-model="confirmPassword"
        name="confirm-password"
        autocomplete="new-password"
        type="password"
        placeholder="비밀번호를 한번 더 입력해주세요"
      />
    </div>

    <div class="w-full flex justify-between gap-4 px-4">
      <ButtonMediumSub @click="goToLogin">
        취소
      </ButtonMediumSub>
      <ButtonMediumMain @click="handleSignup">
        회원가입
      </ButtonMediumMain>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import logo from '@/assets/moa_logo.jpg'
import { signup } from '@/features/user/Auth/services/auth.service'
import ButtonMediumMain from '@/shared/components/atoms/button/ButtonMediumMain.vue'
import ButtonMediumSub from '@/shared/components/atoms/button/ButtonMediumSub.vue'
import Input from '@/shared/components/atoms/input/Input.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'

const router = useRouter()

const email = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')

// 본인인증 정보 가져오기
const name = ref<string>('')
const idCardNumber = ref<string>('')
const accountNumber = ref<string>('')
const accountPassword = ref<string>('')

const goToLogin = () => {
  router.replace({ name: 'login' })
}

const handleSignup = async () => {
  // 한번더 입력한 비밀번호가 일치하지 않을 때 실행
  if (password.value !== confirmPassword.value) {
    alert('비밀번호가 일치하지 않습니다.')
    return
  }

  try {
    await signup(
      email.value,
      password.value,
      name.value,
      idCardNumber.value,
      accountNumber.value,
      accountPassword.value,
      'ROLE_USER'
    )

    localStorage.removeItem('certData')

    alert('회원가입에 성공하였습니다.\n로그인페이지로 이동합니다.')

    router.replace({ name: 'login' })
  } catch (e) {
    console.error(e)
    alert('회원가입에 실패했습니다. 정보를 확인해주세요.')
  }
}

onMounted(() => {
  const certData = JSON.parse(localStorage.getItem('certData') || '{}')
  name.value = certData.name || ''
  idCardNumber.value = certData.idCardNumber || ''
  accountNumber.value = certData.accountNumber || ''
  accountPassword.value = certData.accountPassword || ''
})
</script>
