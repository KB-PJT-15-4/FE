<template>
  <div class="w-full text-left mt-[-20px]">
    <TypographyHead3 class="mb-4">
      나의 여행지도
    </TypographyHead3>

    <!-- 카카오맵 API -->
    <Map @select-location="onSelectLocation" />

    <!-- 해당 지역 여행 목록 카드 -->
    <RecordTripCard
      v-if="selectedLocation"
      :location="selectedLocation"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import Map from '@/shared/components/atoms/map/Map.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import RecordTripCard from '@/features/record/Map/ui/RecordTripCard.vue'

const selectedLocation = ref('')

const onSelectLocation = (location) => {
  selectedLocation.value = location
}
</script>

