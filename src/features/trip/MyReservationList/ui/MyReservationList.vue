<template>
  <div class="mt-2 flex flex-col gap-3">
    <SegmentedTab
      v-model="selectedFilter"
      :options="filterTabOptions"
    />

    <div class="h-[260px] flex flex-col gap-3">
      <div
        v-for="reservation in reservationList"
        :key="reservation.itemId"
      >
        <ReservationInfo :reservation="reservation" />
      </div>
    </div>
    <Pagination
      v-if="totalPage > 1"
      :total-page="totalPage"
      :active-page="currentPage"
      @change="(page: number) => (currentPage = page)"
    />
  </div>
</template>

<script setup lang="ts">
import type { UserReservationList } from '@/entities/trip/trip.entity'
import { filterTabOptions } from '@/entities/trip/trip.entity'
import { getMyReservationList } from '@/features/trip/MyReservationList/services/myReservationList.service'
import { computed, ref, watch } from 'vue'

import Pagination from '@/shared/components/molecules/tab/Pagination.vue'
import SegmentedTab from '@/shared/components/molecules/tab/SegmentedTab.vue'
import { useRoute } from 'vue-router'
import ReservationInfo from './ReservationInfo.vue'

const props = defineProps<{
  tripId: number | null
}>()
const route = useRoute()
const selectedFilter = ref(filterTabOptions[0])
const currentPage = ref(Number(route.query.page ?? 1))
const reservationList = ref<UserReservationList[]>([])
const totalPage = ref(0)

const selectedOption = computed(() => {
  switch (selectedFilter.value) {
    case '교통':
      return 'TRANSPORT'
    case '숙박':
      return 'ACCOMMODATION'
    case '식당':
      return 'RESTAURANT'
    default:
      return null
  }
})

async function fetchReservationList() {
  if (!props.tripId) return

  const result = await getMyReservationList(
    localStorage.getItem('accessToken')!,
    props.tripId,
    currentPage.value - 1,
    3,
    selectedOption.value
  )
  reservationList.value = result.content
  totalPage.value = result.totalPages
}

watch(
  () => route.query.page,
  (newPage) => {
    currentPage.value = Number(newPage ?? 1)
  }
)
watch([() => props.tripId, selectedFilter, currentPage], fetchReservationList, { immediate: true })
</script>
