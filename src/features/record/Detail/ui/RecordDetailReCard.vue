<template>
  <div>
    <Card
      v-for="(reservation, index) in reservationList"
      :key="`${reservation.itemId || 'item'}-${index}`"
      class="flex justify-between mb-2"
    >
      <div class="flex gap-4">
        <div
          class="h-[40px] w-[40px] overflow-hidden rounded-full flex justify-center items-center bg-gray-200"
        >
          <img
            :src="
              reservation.imageUrl ||
                'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/KTX-I_in_Seoul_Station.jpg/960px-KTX-I_in_Seoul_Station.jpg'
            "
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
import { formatFullDateToKorean } from '@/shared/utils/format'
import axios from 'axios'
import { ref, watch } from 'vue'

import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'

import type { ApiReservationItem } from '@/entities/record/record.entity'

// Props 정의
const props = defineProps<{
  date: string
  tripId?: number
}>()

// 예매 리스트
const reservationList = ref<ApiReservationItem[]>([])

// API 호출 함수
const fetchReservationData = async () => {
  // date나 tripId가 없으면 API 호출하지 않음 -> 이 코드 추가안하면 400번 오류발생
  if (!props.date || !props.tripId) {
    reservationList.value = []
    return
  }

  try {
    const token = localStorage.getItem('accessToken')
    if (!token) throw new Error('Access token not found')

    const response = await axios.get(
      '${import.meta.env.VITE_APP_API_URL}/api/member/reservation/by-date',
      {
        params: {
          tripId: props.tripId,
          date: props.date,
          page: 0,
          size: 10,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    reservationList.value = response.data?.data?.content || []
  } catch (err) {
    console.error('예매 내역 조회 실패:', err)
    reservationList.value = []
  }
}

// 날짜나 tripId가 변경될 때 API 호출
watch(
  [() => props.date, () => props.tripId],
  () => {
    fetchReservationData()
  },
  { immediate: true }
)
</script>
