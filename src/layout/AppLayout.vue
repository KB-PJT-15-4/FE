<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <header
      v-if="!shouldHideLayout"
      class="fixed top-0 left-0 w-full z-50"
    >
      <Header />
    </header>

    <main
      :class="[
        'flex-1 overflow-y-auto flex flex-col gap-3 justify-center items-center max-w-[390px] w-full m-auto px-[16px]',
        !shouldHideLayout && 'pt-[650px] pb-[100px]',
      ]"
    >
      <slot />
    </main>

    <footer
      v-if="!shouldHideLayout"
      class="fixed bottom-0 left-0 w-full z-50"
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
</script>
