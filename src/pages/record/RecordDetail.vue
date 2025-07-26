<template>
  <div class="w-full flex flex-col gap-4">
    <!-- 여행 정보 카드 -->
    <Card
      v-if="tripData"
      class="p-2 space-y-1"
    >
      <div class="flex justify-between items-start">
        <div class="font-bold text-lg">
          {{ tripData.title }}
        </div>
        <div class="text-sm text-black">
          {{ tripData.status }}
        </div>
      </div>
      <div class="flex justify-between items-end">
        <div class="text-sm text-[#626262]">
          {{ formatFullDateToKorean(new Date(tripData.startDate)) }} -
          {{ formatFullDateToKorean(new Date(tripData.endDate)) }}
        </div>
        <div class="text-sm text-black">
          {{ tripData.location }}
        </div>
      </div>
    </Card>

    <!-- 날짜 선택 -->
    <DateTab
      v-model="selectedDate"
      start-date="2025-03-24"
      end-date="2025-03-30"
    />

    <!-- 예매내역 카드 -->
    <Card
      v-for="reservation in userReservationListMockData"
      :key="reservation.id"
      class="flex justify-between"
    >
      <div class="flex gap-4">
        <div
          class="h-[40px] w-[40px] overflow-hidden rounded-full flex justify-center items-center"
        >
          <img
            :src="reservation.imageUrl"
            class="h-[40px] w-[40px]"
          >
        </div>
        <div>
          <TypographySubTitle1>{{ reservation.title }}</TypographySubTitle1>
          <TypographyP2 class="text-[#626262]">
            {{ formatFullDateToKorean(new Date(reservation.date)) }}
          </TypographyP2>
        </div>
      </div>
    </Card>

    <!-- 결제내역 카드 -->
    <Card
      v-for="(payment, index) in creditMockData"
      :key="index"
      class="flex justify-between items-center p-4"
    >
      <div>
        <p class="text-sm text-[#626262]">
          {{ formatFullDateToKorean(new Date(payment.date)) }}
        </p>
        <p class="font-semibold text-base">
          {{ payment.title }}
        </p>
      </div>
      <p class="font-bold text-lg">
        {{ formatCurrency(payment.cost) }}
      </p>
    </Card>

    <!-- 기록 추가 버튼 -->
    <ButtonExtraSmallMain
      class="w-[60px]"
      @click="$router.push({ name: 'record_create', params: { tripId: tripId } })"
    >
      추가
    </ButtonExtraSmallMain>

    <!-- 사용자 작성 기록 -->
    <div
      v-for="(record, index) in recordList"
      :key="index"
      class="p-4 bg-white rounded-md shadow border space-y-2"
    >
      <div class="flex justify-between items-center">
        <div class="font-bold text-base">
          {{ record.title }}
        </div>
        <div class="flex gap-2">
          <ButtonExtraSmallMain
            class="w-[60px]"
            @click="editRecord(index)"
          >
            수정
          </ButtonExtraSmallMain>
          <ButtonExtraSmallMain @click="deleteRecord(index)">
            삭제
          </ButtonExtraSmallMain>
        </div>
      </div>
      <div class="text-sm text-[#626262]">
        {{ formatFullDateToKorean(new Date(record.date)) }}
      </div>
      <div v-if="record.imageUrl">
        <img
          :src="record.imageUrl"
          class="w-full rounded"
        >
      </div>
      <p class="text-sm text-[#626262] whitespace-pre-line">
        {{ record.content }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { creditMockData, mockData, userReservationListMockData } from '@/entities/map/map.mock'
import { formatFullDateToKorean } from '@/shared/utils/format'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ButtonExtraSmallMain from '@/shared/components/atoms/button/ButtonExtraSmallMain.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import DateTab from '@/shared/components/molecules/tab/DateTab.vue'

const route = useRoute()
const router = useRouter()
const selectedDate = ref('2025-03-24') // 날짜 탭 날짜 선택

const tripId = Number(route.params.tripId)
const tripData = computed(() => mockData.find((trip) => trip.tripId === tripId))

// 금액 포맷팅 (추후 format.ts 로 이동)
function formatCurrency(amount) {
  return `${amount.toLocaleString()}원`
}

const recordList = ref([])

onMounted(() => {
  const saved = localStorage.getItem(`trip-${tripId}-records`)
  if (saved) {
    recordList.value = JSON.parse(saved)
  }
})

// 기록 수정 기능 함수 (추후 features로 이동)
const editRecord = (index) => {
  router.push({
    path: `/record/${tripId}/create`,
    query: { editIndex: index },
  })
}

// 기록 삭제 기능 함수 (추후 feature로 이동)
const deleteRecord = (index) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    recordList.value.splice(index, 1)
    localStorage.setItem(`trip-${tripId}-records`, JSON.stringify(recordList.value))
  }
}
</script>
