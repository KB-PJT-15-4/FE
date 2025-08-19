<template>
  <nav class="fixed bottom-0 left-0 w-full bg-white border-t z-50">
    <div class="flex justify-around items-center h-[60px] max-w-[390px] w-full mx-auto">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="['flex flex-col items-center justify-center text-moa-main']"
      >
        <i :class="['bi text-2xl transition text-moa-main', tab.icon]" />
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
const tabs = [{ icon: 'bi-house', value: 'home' }]
</script>
