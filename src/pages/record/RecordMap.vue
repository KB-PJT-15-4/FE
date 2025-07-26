<template>
  <div class="w-full text-left py-4">
    <TypographyHead3 class="mb-4">
      나의 여행지도
    </TypographyHead3>

    <!-- 카카오맵 API -->
    <Map @select-location="onSelectLocation" />

    <!-- 여행 지역 마커 클릭시 해당 여행 지역 여행 기록 카드 불러오기 -->
    <div
      v-if="filteredTrips.length > 0"
      class="mt-4 space-y-3"
    >
      <Card
        v-for="trip in filteredTrips"
        :key="trip.tripId"
        class="cursor-pointer"
        @click="goToDetail(trip.tripId)"
      >
        <div class="p-2 space-y-1">
          <div class="flex justify-between items-start">
            <div class="font-bold text-lg">
              {{ trip.title }}
            </div>
            <div class="text-sm text-black">
              {{ trip.status }}
            </div>
          </div>
          <div class="flex justify-between items-end">
            <div class="text-sm text-[#949494]">
              {{ formatFullDateToKorean(new Date(trip.startDate)) }} - {{ formatFullDateToKorean(new Date(trip.endDate)) }}
            </div>
            <div class="text-sm text-black">
              {{ trip.location }}
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { mockData } from '@/entities/map/map.mock'
import { formatFullDateToKorean } from '@/shared/utils/format'

import Map from '@/shared/components/atoms/map/Map.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import Card from '@/shared/components/atoms/card/Card.vue'

const selectedLocation = ref('')
const router = useRouter()

const onSelectLocation = (location) => {
  selectedLocation.value = location
}

const filteredTrips = computed(() =>
  mockData.filter(trip => trip.location === selectedLocation.value)
)

const goToDetail = (tripId) => {
  router.push(`/record/${tripId}/detail`)
}
</script>