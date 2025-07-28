<template>
  <div class="relative w-full max-w-[390px] mx-auto bg-white">
    <!-- 헤더 -->
    <header
      v-if="!shouldHideLayout"
      class="fixed top-0 left-0 w-full z-50 flex justify-center"
    >
      <Header />
    </header>

    <!-- 메인 콘텐츠 -->
    <main
      :class="[
        'overflow-y-auto px-[16px] flex flex-col gap-3 justify-start items-center',
        !shouldHideLayout && 'pt-[80px] pb-[100px]',
      ]"
      :style="mainStyle"
    >
      <slot />
    </main>

    <!-- 푸터 -->
    <footer
      v-if="!shouldHideLayout"
      class="fixed bottom-0 left-0 w-full z-50 max-w-[390px]"
    >
      <NavBar v-model="currentTab" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import Header from '@/shared/components/organisms/Header.vue'
import NavBar from '@/shared/components/organisms/NavBar.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const shouldHideLayout = computed(() => route.meta.layout === false)

const tab = ['home', 'map', 'trip']
const currentTab = ref(tab[0])

const mainStyle = computed(() => {
  return {
    height: '100dvh',
    overflow: 'auto',
  }
})
</script>
