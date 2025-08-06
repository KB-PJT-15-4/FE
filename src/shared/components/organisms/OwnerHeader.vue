<template>
  <div class="w-full border-b-[1px] justify-center flex bg-white">
    <div class="max-w-[390px] w-full px-5 py-3 flex justify-between items-center">
      <img
        :src="logo"
        alt="moa logo"
        class="w-[60px]"
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import logo from '@/assets/moa_logo.jpg'
</script>
