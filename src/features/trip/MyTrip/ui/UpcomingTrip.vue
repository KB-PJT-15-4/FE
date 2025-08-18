<template>
  <div
    v-if="upcomingTrip"
    class="relative w-full h-[140px] rounded-2xl overflow-hidden"
    @click="router.push({ name: 'trip_detail', params: { tripId: 1 } })"
  >
    <img
      :src="tripImageUrl"
      alt="여행 이미지"
      class="absolute inset-0 w-full h-full object-cover z-0"
    >
    <div class="absolute inset-0 bg-black/30 z-10" />

    <div class="absolute top-3 left-3 z-20">
      <span class="px-2 py-1 text-xs font-semibold rounded-full bg-white/90 text-gray-900">
        D{{ upcomingTrip.dday === 0 ? '-DAY' : '-' + upcomingTrip.dday }}
      </span>
    </div>

    <div class="absolute bottom-3 left-3 text-white z-20">
      <div class="text-sm font-semibold">
        {{ convertLocationNameToKorean(upcomingTrip.locationName) }} · {{ upcomingTrip.title }}
      </div>
      <div class="text-[11px] opacity-80">
        {{ upcomingTrip.startDate + ' - ' + upcomingTrip.endDate }} ·
        {{ upcomingTrip.memberCount }}명
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { LocationImage, type UpcomingTripInfo } from '@/entities/trip/trip.entity'
import { convertLocationNameToKorean } from '@/shared/utils/format'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getUpcomingTrip } from '../services/myTrip.service'

const router = useRouter()
const upcomingTrip = ref<UpcomingTripInfo>()

async function getUpcomingTripFunction() {
  upcomingTrip.value = await getUpcomingTrip()
}

const tripImageUrl = computed(() => {
  if (!upcomingTrip.value) return ''
  return LocationImage[upcomingTrip.value.locationName as keyof typeof LocationImage]
})

onMounted(() => {
  getUpcomingTripFunction()
})
</script>
