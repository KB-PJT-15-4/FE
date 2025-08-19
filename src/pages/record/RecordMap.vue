<template>
  <div class="w-full text-left -mt-[20px]">
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

    <!-- 선택 전 안내 문구 -->
    <div v-else>
      <TypographyHead3 class="mt-20 text-center">
        여행 지역을 선택해주세요
      </TypographyHead3>
      <TypographyCaption class="text-moa-gray-text mt-2 text-center">
        지역 마커를 클릭하면 여행 목록이 출력됩니다
      </TypographyCaption>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import Map from '@/features/record/Map/ui/Map.vue'
import RecordTripCard from '@/features/record/Map/ui/RecordTripCard.vue'
import TypographyCaption from '@/shared/components/atoms/typography/TypographyCaption.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'

const selectedLocation = ref('')

const onSelectLocation = (location) => {
  selectedLocation.value = location
}
</script>
