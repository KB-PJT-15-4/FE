<template>
  <div class="w-full justify-center flex bg-transparent">
    <div class="max-w-[390px] w-full px-5 py-3 flex justify-between items-center">
      <!-- <img :src="logo" alt="moa logo" class="w-[60px]" /> -->
      <TypographyHead2>MOA</TypographyHead2>
      <div class="flex gap-3 items-center justify-center">
        <button
          class="w-[30px] h-[30px] flex justify-center items-center"
          @click="router.push({ name: 'my' })"
        >
          <i class="bi bi-person-circle text-[20px]" />
        </button>
        <button
          class="w-[30px] h-[30px] flex justify-center items-center"
          @click="router.push({ name: 'notification' })"
        >
          <i class="bi bi-bell text-[20px]" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import TypographyHead2 from '../atoms/typography/TypographyHead2.vue'

const router = useRouter()
</script>
