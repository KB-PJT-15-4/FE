<template>
  <div class="w-full flex flex-col gap-3">
    <TripInfoBox
      v-if="trip"
      :trip="trip"
    />
    <ToggleTab
      v-model="currentLabel"
      :options="toggleOptions"
    />
    <div v-if="selectedOption === 'reservationList'">
      <MyReservationList :trip-id="Number(tripId)" />
    </div>
    <div v-if="selectedOption === 'reservation'">
      <Reservation />
    </div>
    <div v-if="selectedOption === 'settle'">
      <SettlementHistory />
      <RequestSettlement />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import type { TripInfo } from '@/entities/trip/trip.entity'
import { getTripInfo } from '@/features/trip/MyReservationList/services/myReservationList.service'
import MyReservationList from '@/features/trip/MyReservationList/ui/MyReservationList.vue'
import TripInfoBox from '@/features/trip/MyTrip/ui/TripInfoBox.vue'
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
