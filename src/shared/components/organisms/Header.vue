<template>
  <div class="w-full border-b-[1px] justify-center flex bg-white">
    <div class="max-w-[390px] w-full px-5 py-3 flex justify-between items-center">
      <img
        :src="logo"
        alt="moa logo"
        class="w-[60px]"
      >
      <button
        class="w-[30px] h-[30px] flex justify-center items-center"
        @click="router.push(URL.PAGE.MAIN.NOTIFICATION)"
      >
        <i class="bi bi-bell text-[20px]" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import logo from '@/assets/moa_logo.jpg'
import URL from '@/shared/constants/URL'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
