<template>
  <div class="relative w-full max-w-[390px] mx-auto bg-white">
    <!-- 헤더 -->
    <header
      v-if="!shouldHideLayout || !tripDetail"
      class="fixed top-0 left-0 w-full z-50 flex justify-center"
      :class="tripDetail && 'text-white'"
    >
      <Header v-if="!isOwner" />
      <OwnerHeader v-if="isOwner" />
    </header>

    <!-- 메인 콘텐츠 -->
    <main
      ref="mainRef"
      :class="[
        'overflow-y-auto flex flex-col gap-3 justify-start items-center',
        !shouldHideLayout && !tripDetail && 'pt-[80px]',
        !tripDetail && ' px-[16px] pb-[100px]',
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
      <OwnerNavBar v-if="isOwner" />
      <NavBar
        v-if="!isOwner"
        v-model="currentTab"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import Header from '@/shared/components/organisms/Header.vue'
import NavBar from '@/shared/components/organisms/NavBar.vue'
import OwnerHeader from '@/shared/components/organisms/OwnerHeader.vue'
import OwnerNavBar from '@/shared/components/organisms/OwnerNavBar.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const shouldHideLayout = computed(() => route.meta.layout === false)
const isOwner = computed(() => route.meta.owner === true)
const tripDetail = computed(() => route.meta.dark === true)
const tab = ['home', 'map', 'trip']
const currentTab = ref(tab[0])

const mainStyle = computed(() => {
  return {
    height: '100dvh',
    overflow: 'auto',
  }
})
</script>
