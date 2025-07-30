<template>
  <SegmentedTab
    v-model="selectedSegmentOption"
    :options="filterTabOptions"
    class="mt-2"
  />
  <div
    v-for="reservation in userReservationListMockData"
    :key="reservation.id"
    :value="reservation"
  >
    <ReservationInfo
      :reservation="reservation"
      class="my-3"
    />
  </div>
  <Pagination
    :total-page="totalPage"
    :active-page="page"
  />
</template>
<script setup lang="ts">
import { filterTabOptions } from '@/entities/trip/trip.entity'
import { userReservationListMockData } from '@/entities/trip/trip.mock'
import Pagination from '@/shared/components/molecules/tab/Pagination.vue'
import SegmentedTab from '@/shared/components/molecules/tab/SegmentedTab.vue'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ReservationInfo from './ReservationInfo.vue'

const props = withDefaults(
  defineProps<{
    page?: number
    totalPage: number
  }>(),
  {
    page: 1,
  }
)
const router = useRouter()
const route = useRoute()
const currentPage = ref(props.page)

// 쿼리 파라미터를 페이지 변경 시 반영
watch(currentPage, (newPage) => {
  router.replace({ query: { ...route.query, page: String(newPage) } })
  // 여기에 API 호출 함수 호출 (ex: fetchReservationList())
})

const selectedSegmentOption = ref(filterTabOptions[0])
</script>
