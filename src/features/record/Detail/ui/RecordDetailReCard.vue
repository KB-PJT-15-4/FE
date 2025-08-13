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
          <TypographyP2 class="text-moa-gray-text">
            {{ formatFullDateToKorean(new Date(reservation.date)) }}
          </TypographyP2>
        </div>
      </div>
    </Card>

    <!-- 데이터가 없을 때 표시 -->
    <div
      v-if="reservationList.length === 0"
      class="text-center text-moa-gray-text py-8"
    >
      해당 날짜에 예매 내역이 없습니다.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { formatFullDateToKorean } from '@/shared/utils/format'
import type { ApiReservationItem } from '@/entities/record/record.entity'

import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'

import { fetchReservationByDate } from '../services/recordDetail.service'

const props = defineProps<{
  date: string
  tripId?: number
}>()

const reservationList = ref<ApiReservationItem[]>([])
const apiBaseUrl = import.meta.env.VITE_APP_API_URL

async function load() {
  // date나 tripId가 없으면 API 호출하지 않음(400 방지)
  if (!props.date || !props.tripId) {
    reservationList.value = []
    return
  }
  const token = localStorage.getItem('accessToken') || ''
  if (!token) return

  const res = await fetchReservationByDate({
    token,
    apiBaseUrl,
    tripId: props.tripId,
    date: props.date,
    page: 0,
    size: 10,
  })
  reservationList.value = res.content
}

watch([() => props.date, () => props.tripId], load, { immediate: true })
</script>
