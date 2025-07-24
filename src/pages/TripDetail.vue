<template>
  <div class="w-full flex flex-col gap-3">
    <TripInfo :trip="trip" />
    <ToggleTab
      v-model="currentLabel"
      :options="toggleOptions"
    />
    <div v-if="selectedOption === 'reservation'">
      <MyReservationList />
      <Reservation />
    </div>
    <div v-else-if="selectedOption === 'settle'">
      <SettlementHistory />
      <RequestSettlement />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { tripInformationMockData } from '@/entities/trip/trip.mock'
import MyReservationList from '@/features/trip/MyReservationList/ui/MyReservationList.vue'
import TripInfo from '@/features/trip/MyTrip/ui/TripInfo.vue'
import Reservation from '@/features/trip/Reservation/ui/Reservation.vue'
import RequestSettlement from '@/features/trip/Settlement/ui/RequestSettlement.vue'
import SettlementHistory from '@/features/trip/Settlement/ui/SettlementHistory.vue'
import ToggleTab from '@/shared/components/molecules/tab/ToggleTab.vue'
import { useRoute, useRouter } from 'vue-router'
const trip = tripInformationMockData

type TabValue = 'reservation' | 'settle'

const labelForTab: Record<TabValue, string> = {
  reservation: '예매',
  settle: '정산',
}

const valueForLabel: Record<string, TabValue> = {
  예매: 'reservation',
  정산: 'settle',
}

const toggleOptions = Object.values(labelForTab)

const route = useRoute()
const router = useRouter()

const selectedOption = ref<TabValue>((route.query.tab as TabValue) || 'reservation')

const currentLabel = computed({
  get: () => labelForTab[selectedOption.value],
  set: (newLabel) => {
    selectedOption.value = valueForLabel[newLabel]
  },
})

watch(selectedOption, (newTab) => {
  router.replace({ query: { ...route.query, tab: newTab } })
})
</script>
