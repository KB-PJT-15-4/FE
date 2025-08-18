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
          <TypographyHead3>{{ trip.tripName }}</TypographyHead3>
          <TypographyP2>{{ trip.status }}</TypographyP2>
        </div>
        <div class="flex justify-between items-end">
          <TypographyP2 class="text-moa-sub-text text-sm">
            {{ formatFullDateToKorean(new Date(trip.startDate)) }} -
            {{ formatFullDateToKorean(new Date(trip.endDate)) }}
          </TypographyP2>
          <TypographyP2>{{ trip.locationName }}</TypographyP2>
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
import type { Trip } from '@/entities/record/record.entity'
import { formatFullDateToKorean } from '@/shared/utils/format'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import Pagination from '@/shared/components/molecules/tab/Pagination.vue'
import { getTripList } from '../services/mapTripCard.service'

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

const currentPage = ref<number>(Number(route.query.page) || props.page || 1)
const totalPage = ref<number>(1)

// API 호출
async function getTripListFunction() {
  try {
    const result = await getTripList(currentPage.value - 1, 2, props.location)
    trips.value = result.content
    totalPage.value = result.totalPages
  } catch (error) {
    console.error('여행 데이터 가져오기 실패:', error)
  }
}

// 페이지 query 변경 시
watch(
  () => route.query.page,
  async (newPage) => {
    if (!newPage) return
    currentPage.value = Number(newPage)
    await getTripListFunction()
  },
  { immediate: true }
)

// location 변경 시 첫 페이지로 리셋
watch(
  () => props.location,
  async () => {
    currentPage.value = 1
    await getTripListFunction()
  },
  { immediate: true }
)

const pagedTrips = computed(() => trips.value)

// 상세 페이지 이동
function goToDetail(tripId: number) {
  router.push({ name: 'record_detail', params: { tripId } })
}
</script>
