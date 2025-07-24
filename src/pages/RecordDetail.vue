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
          {{ formatFullDateToKorean(new Date(tripData.startDate)) }} - {{ formatFullDateToKorean(new Date(tripData.endDate)) }}
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
      :value="reservation"
      class="flex justify-between"
    >
      <div class="flex gap-4">
        <div class="h-[40px] w-[40px] overflow-hidden rounded-full flex justify-center items-center">
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

    <Tag
      color="main"
      @click="getToCreate"
    >
      추가
    </Tag>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import DateTab from '@/shared/components/molecules/tab/DateTab.vue'
import Tag from '@/shared/components/atoms/tag/Tag.vue'
import { formatFullDateToKorean } from '@/shared/utils/format'
import { mockData, userReservationListMockData, creditMockData } from '@/entities/map/map.mock'

const route = useRoute()
const selectedDate = ref('2025-03-24')

const tripId = Number(route.params.tripId)

const tripData = computed(() => mockData.find(trip => trip.tripId === tripId))

// 금액 포맷 함수
function formatCurrency(amount) {
  return `${amount.toLocaleString()}원`
}
</script>