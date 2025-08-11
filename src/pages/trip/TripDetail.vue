<template>
  <div class="w-full flex flex-col bg-white">
    <!-- 히어로 -->
    <div class="relative h-[200px]">
      <img
        src="https://t1.daumcdn.net/news/202408/04/speaktravel/20240804090001287dbfq.jpg"
        class="absolute inset-0 w-full h-full object-cover object-top"
        alt=""
      >
      <div
        class="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent"
      />

      <div class="relative pt-[50px] px-[16px]">
        <TripInfoBoxDark
          v-if="trip"
          :trip="trip"
        />
      </div>
    </div>

    <div
      class="relative z-10 -mt-10 w-full rounded-t-[30px] bg-white px-[10px] pt-7 pb-6 shadow-[0_-6px_16px_rgba(0,0,0,0.08)]"
    >
      <div class="flex justify-between items-center gap-2">
        <ToggleTab
          v-model="currentLabel"
          :options="toggleOptions"
        />
        <button
          class="border rounded-full bg-moa-gray w-[50px] h-[40px] flex justify-center items-center"
          @click="router.push({ name: 'add_member', params: { tripId: tripId } })"
        >
          <i class="bi bi-person-plus text-[22px] text-moa-main-text" />
        </button>
      </div>

      <div v-if="selectedOption === 'reservationList'">
        <MyReservationList :trip-id="Number(tripId)" />
      </div>
      <div v-else-if="selectedOption === 'reservation'">
        <Reservation />
      </div>
      <div v-else>
        <SettlementHistory />
        <RequestSettlement />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import type { TripInfo } from '@/entities/trip/trip.entity'
import { getTripInfo } from '@/features/trip/MyReservationList/services/myReservationList.service'
import MyReservationList from '@/features/trip/MyReservationList/ui/MyReservationList.vue'
import TripInfoBoxDark from '@/features/trip/MyTrip/ui/TripInfoBoxDark.vue'
import Reservation from '@/features/trip/Reservation/ui/Reservation.vue'
import RequestSettlement from '@/features/trip/Settlement/ui/RequestSettlement.vue'
import SettlementHistory from '@/features/trip/Settlement/ui/SettlementHistory.vue'
import ToggleTab from '@/shared/components/molecules/tab/ToggleTab.vue'
import { useRoute, useRouter } from 'vue-router'
const trip = ref<TripInfo>()

type TabValue = 'reservationList' | 'reservation' | 'settle'

const labelForTab: Record<TabValue, string> = {
  reservationList: '예매내역',
  reservation: '예매하기',
  settle: '정산',
}

const valueForLabel: Record<string, TabValue> = {
  예매내역: 'reservationList',
  예매하기: 'reservation',
  정산: 'settle',
}

const toggleOptions = Object.values(labelForTab)

const route = useRoute()
const router = useRouter()

const selectedOption = ref<TabValue>((route.query.tab as TabValue) || 'reservation')
const tripId = route.params.tripId as string

const currentLabel = computed({
  get: () => labelForTab[selectedOption.value],
  set: (newLabel) => {
    selectedOption.value = valueForLabel[newLabel]
  },
})

watch(selectedOption, (newTab) => {
  router.replace({ query: { tab: newTab } })
})

async function getTripInfoFunction() {
  try {
    trip.value = await getTripInfo(localStorage.getItem('accessToken')!, tripId)
  } catch (e) {
    console.error(e)
    alert('여행 정보를 불러오는데 실패하였습니다.')
  }
}

onMounted(() => {
  getTripInfoFunction()
})
</script>
