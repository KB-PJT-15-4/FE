<template>
  <div class="flex flex-wrap justify-center gap-2">
    <ButtonSquare
      v-for="page in pages"
      :key="page"
      :active="page === activePage"
      :variant="page === activePage ? 'main' : 'ghost'"
      @click="goToPage(page)"
    >
      {{ page }}
    </ButtonSquare>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ButtonSquare from '../../atoms/button/ButtonSquare.vue'

interface Props {
  totalPage: number
  activePage: number
}

const props = defineProps<Props>()

const route = useRoute()
const router = useRouter()

const maxPageToShow = 5

const startPage = computed(() => {
  if (props.activePage <= 3) return 1
  return Math.max(1, props.activePage - 2)
})

const endPage = computed(() => {
  const tentativeEnd = startPage.value + maxPageToShow - 1
  return Math.min(tentativeEnd, props.totalPage)
})

const pages = computed(() => {
  const result = []
  for (let i = startPage.value; i <= endPage.value; i++) {
    result.push(i)
  }
  return result
})

const goToPage = (page: number) => {
  const query = { ...route.query, page: page.toString() }
  router.push({ path: route.path, query }).then(() => {
    const layoutMain = document.querySelector('main')
    layoutMain?.scrollTo({ top: 0, behavior: 'smooth' })
  })
}
</script>
