<template>
  <div class="w-full flex flex-col bg-white h-screen">
    <div class="sticky top-0 h-[220px] shrink-0">
      <img
        src="https://t1.daumcdn.net/news/202408/04/speaktravel/20240804090001287dbfq.jpg"
        class="absolute inset-0 w-full h-full object-cover object-top"
        alt=""
      >
      <div class="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent" />

      <div class="relative pt-[50px] px-[16px]">
        <TripInfoBoxDark
          v-if="trip"
          :trip="trip"
        />
      </div>
    </div>

    <div
      class="relative -mt-4 z-20 rounded-t-[20px] bg-white px-[10px] max-h-[100vh] overflow-scroll pt-7"
    >
      <div class="flex justify-between items-center gap-2 mb-2">
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

      <div>
        <MyReservationList
          v-if="selectedOption === 'reservationList'"
          :trip-id="Number(tripId)"
        />
        <Reservation v-else-if="selectedOption === 'reservation'" />
        <template v-else>
          <SettlementHistory />
          <RequestSettlement />
        </template>
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
