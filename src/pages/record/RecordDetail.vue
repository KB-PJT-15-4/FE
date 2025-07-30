<template>
  <div class="w-full flex flex-col gap-4">
    <!-- 여행 정보 카드 -->
    <RecordDetailTripCard :trip="tripData" />

    <!-- 날짜 탭 -->
    <DateTab
      v-model="selectedDate"
      start-date="2025-03-24"
      end-date="2025-03-30"
    />

    <!-- 예매 내역 카드 -->
    <RecordDetailReCard :reservation-list="userReservationListMockData" />
    
    <!-- 결제 내역 카드 -->
    <RecordDetailCredCard :credit-list="creditMockData" />

    <!-- 추가 버튼 -->
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
        <div class="flex gap-2 w-[120px]">
          <ButtonExtraSmallMain @click="editRecord(index)">
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

<script setup lang="ts">
import { mockData, userReservationListMockData, creditMockData } from '@/entities/map/map.mock'
import { formatFullDateToKorean } from '@/shared/utils/format'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ButtonExtraSmallMain from '@/shared/components/atoms/button/ButtonExtraSmallMain.vue'
import DateTab from '@/shared/components/molecules/tab/DateTab.vue'

import RecordDetailTripCard from '@/features/record/Detail/ui/RecordDetailTripCard.vue'
import RecordDetailReCard from '@/features/record/Detail/ui/RecordDetailReCard.vue'
import RecordDetailCredCard from '@/features/record/Detail/ui/RecordDetailCredCard.vue'

const route = useRoute()
const router = useRouter()
const selectedDate = ref('2025-03-24')

const tripId = Number(route.params.tripId)
const tripData = computed(() => mockData.find((trip) => trip.tripId === tripId) ?? null)

const recordList = ref<Array<{
  title: string
  date: string
  imageUrl?: string
  content: string
}>>([])

onMounted(() => {
  const saved = localStorage.getItem(`trip-${tripId}-records`)
  if (saved) {
    recordList.value = JSON.parse(saved)
  }
})

const editRecord = (index: number) => {
  router.push({ path: `/record/${tripId}/create`, query: { editIndex: index } })
}

const deleteRecord = (index: number) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    recordList.value.splice(index, 1)
    localStorage.setItem(`trip-${tripId}-records`, JSON.stringify(recordList.value))
  }
}
</script>