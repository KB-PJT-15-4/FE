<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-[360px]">
      <div class="flex flex-col gap-3">
        <SegmentedTab
          v-model="selectedFilter"
          :options="filterTabOptions"
          class="my-2"
        />

        <div class="flex flex-col gap-3">
          <div
            v-if="!tripId || reservationList.length === 0"
            class="w-full flex justify-center mt-4"
          >
            <img
              :src="logo"
              class="h-[180px]"
            >
          </div>

          <TypographySubTitle1
            v-if="!tripId"
            class="w-full text-center text-moa-sub-text"
          >
            여행을 먼저 선택해주세요
          </TypographySubTitle1>

          <TypographySubTitle1
            v-if="tripId && reservationList.length === 0"
            class="w-full text-center text-moa-sub-text"
          >
            예매 내역이 존재하지 않습니다.
          </TypographySubTitle1>

          <div
            v-for="(reservation, index) in reservationList"
            :key="index"
          >
            <ReservationInfo :reservation="reservation" />
          </div>
        </div>

        <div
          v-if="totalPage > 1"
          class="w-full flex justify-center"
        >
          <Pagination
            :total-page="totalPage"
            :active-page="currentPage"
            @change="
              (page: number) => {
                const query = { ...route.query, page: page.toString() }
                router.push({ path: route.path, query })
              }
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/moa_character_1.png'
import type { UserReservationList } from '@/entities/trip/trip.entity'
import { filterTabOptions } from '@/entities/trip/trip.entity'
import { getMyReservationList } from '@/features/trip/MyReservationList/services/myReservationList.service'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import Pagination from '@/shared/components/molecules/tab/Pagination.vue'
import SegmentedTab from '@/shared/components/molecules/tab/SegmentedTab.vue'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ReservationInfo from './ReservationInfo.vue'
const props = defineProps<{
  tripId: number | string | null
}>()
const route = useRoute()
const router = useRouter()

const selectedFilter = ref(
  filterTabOptions.find((option) => mapOptionToQueryParam(option) === route.query.type) ??
    filterTabOptions[0]
)
const currentPage = ref(Number(route.query.page ?? 1))
const reservationList = ref<UserReservationList[]>([])
const totalPage = ref(0)

watch(selectedFilter, (newFilter) => {
  const query = {
    ...route.query,
    type: mapOptionToQueryParam(newFilter),
    page: '1',
  }
  router.replace({ path: route.path, query })
})

function mapOptionToQueryParam(option: string): string | undefined {
  switch (option) {
    case '교통':
      return 'TRANSPORT'
    case '숙박':
      return 'ACCOMMODATION'
    case '식당':
      return 'RESTAURANT'
    case '전체':
    default:
      return undefined
  }
}

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
    Number(props.tripId),
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
