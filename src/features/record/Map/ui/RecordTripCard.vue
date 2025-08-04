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
            {{ trip.tripName }}
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
            {{ trip.locationName }}
          </div>
        </div>
      </div>
    </Card>

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
import type { Trip } from '@/shared/types/trip'

import axios from 'axios'
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
const trips = ref<Trip[]>([])

const ITEMS_PER_PAGE = 3 // 페이지네이션 카드 단위
const currentPage = ref(Number(route.query.page) || props.page || 1)
const totalPage = ref(1)

// api 연결
const fetchTrips = async () => {
  try {
    const token = localStorage.getItem('accessToken')
    if (!token) throw new Error('Access token not found')

    const response = await axios.get('http://localhost:8080/api/trips', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: currentPage.value - 1,
        size: ITEMS_PER_PAGE,
        locationName: props.location,
      },
    })

    const { content, totalPages } = response.data.data
    trips.value = content
    totalPage.value = totalPages
  } catch (error) {
    console.error('여행 데이터 가져오기 실패:', error)
  }
}

// 페이지 query가 바뀌면 currentPage 갱신 + fetch
watch(
  () => route.query.page,
  async (newPage) => {
    if (!newPage) return
    currentPage.value = Number(newPage)
    await fetchTrips()
  },
  { immediate: true }
)

// locationName이 바뀌면 첫 페이지로 리셋 + fetch
watch(
  () => props.location,
  async () => {
    currentPage.value = 1
    await fetchTrips()
  },
  { immediate: true }
)

const pagedTrips = computed(() => trips.value)

// RecordDetail.vue 페이지 이동
const goToDetail = (tripId: number) => {
  router.push({ name: 'record_detail', params: { tripId } })
}

// location 로그 확인용
watch(
  () => props.location,
  (loc) => console.log('📍 선택된 지역:', loc),
  { immediate: true }
)
</script>
