<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <!-- 고정 헤더 -->
    <header class="fixed top-0 left-0 w-full z-50">
      <Header />
    </header>

    <!-- 스크롤 가능한 메인 콘텐츠 -->
    <main class="pt-[60px] pb-[60px] flex-1 overflow-y-auto">
      <slot />
    </main>

    <footer class="fixed bottom-0 left-0 w-full z-50">
      <NavBar v-model="currentTab" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import Header from '@/shared/components/organisms/Header.vue'
import NavBar from '@/shared/components/organisms/NavBar.vue'
import { ref } from 'vue'

const tab = ['home', 'map', 'trip']
const currentTab = ref(tab[0])
</script>
