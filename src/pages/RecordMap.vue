<template>
  <div class="w-full text-left py-4">
    <TypographyHead3>
      우리 여행지도
    </TypographyHead3>

    <!-- 카카오맵 API 연동 지도 -->
    <Map @select-location="onSelectLocation" />

    <!-- 핀 클릭 시 해당 지역 여행 리스트 카드로 출력 -->
    <div
      v-if="filteredTrips.length > 0"
      class="mt-4 space-y-3"
    >
      <Card
        v-for="trip in filteredTrips"
        :key="trip.tripId"
      >
        <div class="p-3">
          <div class="font-bold text-lg">
            {{ trip.title }}
          </div>
          <div class="text-sm text-[#949494]">
            {{ trip.startDate }} - {{ trip.endDate }}
          </div>
          <div class="text-sm text-black">
            {{ trip.status }}
          </div>
          <div class="text-sm">
            {{ trip.location }}
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import Map from '@/shared/components/atoms/map/Map.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import { ref, computed } from 'vue'
import { mockData } from '@/entities/map/map.mock'

// 핀을 누르면 mock 데이터의 location 속성값이 동일한 여행 리스트 출력
const selectedLocation = ref('')

const onSelectLocation = (location) => {
  selectedLocation.value = location
}

const filteredTrips = computed(() =>
  mockData.filter(trip => trip.location === selectedLocation.value)
)
//
</script>
