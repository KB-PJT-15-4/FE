<template>
  <div
    v-if="pagedTrips.length > 0"
    class="mt-4 space-y-3"
  >
    <Card
      v-for="trip in pagedTrips"
      :key="trip.tripId"
      class="cursor-pointer"
      @click="goToDetail(trip.tripId)"
    >
      <div class="p-2 space-y-1">
        <div class="flex justify-between items-start">
          <div class="font-bold text-lg">
            {{ trip.title }}
          </div>
          <div class="text-sm text-black">
            {{ trip.status }}
          </div>
        </div>
        <div class="flex justify-between items-end">
          <div class="text-sm text-[#949494]">
            {{ formatFullDateToKorean(new Date(trip.startDate)) }} -
            {{ formatFullDateToKorean(new Date(trip.endDate)) }}
          </div>
          <div class="text-sm text-black">
            {{ trip.location }}
          </div>
        </div>
      </div>
    </Card>

    <!-- 페이지네이션 -->
    <Pagination
      :total-page="totalPage"
      :active-page="currentPage"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { formatFullDateToKorean } from '@/shared/utils/format'
import { mockData } from '@/entities/map/map.mock'

import Card from '@/shared/components/atoms/card/Card.vue'
import Pagination from '@/shared/components/molecules/tab/Pagination.vue'

const props = withDefaults(
  defineProps<{
    page?: number
    location: string
  }>(),
  {
    page: 1,
  }
)

const router = useRouter()
const route = useRoute()
const ITEMS_PER_PAGE = 2

const currentPage = ref(Number(route.query.page) || props.page || 1)

// query 변경 시 currentPage 반영
watch(
  () => route.query.page,
  (newPage) => {
    const parsed = Number(newPage)
    currentPage.value = isNaN(parsed) || parsed < 1 ? 1 : parsed
  },
  { immediate: true }
)

watch(currentPage, (newPage) => {
  router.replace({ query: { ...route.query, page: String(newPage) } })
})

// 추후 api 연동하면 수정할 코드
const filteredTrips = computed(() =>
  mockData.filter((trip) => trip.location === props.location)
)

// 추후 api 연동하면 수정할 코드 2
const pagedTrips = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  return filteredTrips.value.slice(start, start + ITEMS_PER_PAGE)
})

// 추후 api 연동하면 수정할 코드 3
const totalPage = computed(() =>
  Math.ceil(filteredTrips.value.length / ITEMS_PER_PAGE)
)

const goToDetail = (tripId: number) => {
  router.push({ name: 'record_detail', params: { tripId } })
}
</script>

