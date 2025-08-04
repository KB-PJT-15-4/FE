<template>
  <div class="w-full flex flex-col gap-3">
    <TripInfoBox :trip="trip" />
    <ToggleTab
      v-model="currentLabel"
      :options="toggleOptions"
    />
    <div v-if="selectedOption === 'reservationList'">
      <MyReservationList
        :page="page"
        :total-page="totalCount"
      />
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
import { computed, ref, watch } from 'vue'

import { tripInformationMockData } from '@/entities/trip/trip.mock'
import MyReservationList from '@/features/trip/MyReservationList/ui/MyReservationList.vue'
import TripInfoBox from '@/features/trip/MyTrip/ui/TripInfoBox.vue'
import Reservation from '@/features/trip/Reservation/ui/Reservation.vue'
import RequestSettlement from '@/features/trip/Settlement/ui/RequestSettlement.vue'
import SettlementHistory from '@/features/trip/Settlement/ui/SettlementHistory.vue'
import ToggleTab from '@/shared/components/molecules/tab/ToggleTab.vue'
import { useRoute, useRouter } from 'vue-router'
const trip = tripInformationMockData

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

const page = computed(() => Number(route.query.page ?? 1))
const totalCount = ref(10)

const currentLabel = computed({
  get: () => labelForTab[selectedOption.value],
  set: (newLabel) => {
    selectedOption.value = valueForLabel[newLabel]
  },
})

watch(selectedOption, (newTab) => {
  router.replace({ query: { tab: newTab } })
})
</script>
