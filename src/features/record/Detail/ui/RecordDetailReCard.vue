<template>
  <div>
    <Card
      v-for="(reservation, index) in reservationList"
      :key="`${reservation.itemId || 'item'}-${index}`"
      class="flex justify-between mb-2"
    >
      <div class="flex gap-4">
        <div class="h-[40px] w-[40px] overflow-hidden rounded-full flex justify-center items-center bg-gray-200">
          <img
            :src="reservation.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/KTX-I_in_Seoul_Station.jpg/960px-KTX-I_in_Seoul_Station.jpg'"
            :alt="reservation.name || 'Default Image'"
            class="h-[40px] w-[40px] object-cover"
          >
        </div>
        <div>
          <TypographySubTitle1>{{ reservation.name }}</TypographySubTitle1>
          <TypographyP2 class="text-[#626262]">
            {{ formatFullDateToKorean(new Date(reservation.date)) }}
          </TypographyP2>
        </div>
      </div>
    </Card>

    <div v-if="reservationList.length === 0">
      <TypographySubTitle1 class="text-center py-8 text-moa-gray-text">
        해당 날짜에 예매 내역이 없습니다.
      </TypographySubTitle1>
    </div>

    <!-- 페이지네이션 -->
    <div
      v-if="totalPage > 1"
      class="mt-3"
    >
      <Pagination
        :total-page="totalPage"
        :active-page="currentPage"
        @change="onChangePage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { formatFullDateToKorean } from '@/shared/utils/format'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import Pagination from '@/shared/components/molecules/tab/Pagination.vue'
import type { ApiReservationItem } from '@/entities/record/record.entity'
import type { Paged } from '@/shared/utils/common.types'
import { fetchReservationsByDate } from '../services/recordDetail.service'

const props = defineProps<{ date: string; tripId?: number }>()

const reservationList = ref<ApiReservationItem[]>([])
const currentPage = ref<number>(1)   
const pageSize = ref<number>(10)
const totalElements = ref<number>(0)
const totalPage = computed(() =>
  Math.max(1, Math.ceil((totalElements.value ?? 0) / pageSize.value))
)

async function load() {
  if (!props.date || !props.tripId) {
    reservationList.value = []
    totalElements.value = 0
    currentPage.value = 1
    return
  }

  try {
    const res: Paged<ApiReservationItem> = await fetchReservationsByDate({
      tripId: props.tripId,
      date: props.date,
      page: currentPage.value - 1,
      size: pageSize.value,
    })

    reservationList.value = res.content ?? []
    totalElements.value =
      res.totalElements ??
      (Array.isArray(res.content) ? res.content.length : 0)

    if (reservationList.value.length === 0 && currentPage.value > 1) {
      currentPage.value -= 1
      await load()
    }
  } catch (e) {
    console.error('예매 내역 조회 실패:', e)
    reservationList.value = []
    totalElements.value = 0
  }
}

function onChangePage(page: number) {
  currentPage.value = page
}

watch([() => props.date, () => props.tripId, currentPage], load, {
  immediate: true,
})
</script>