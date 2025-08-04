<template>
  <div class="w-full flex flex-col justify-center">
    <ItemInfo
      :item="item"
      class="mb-3"
    />
    <div class="w-full overflow-y-scroll">
      <Select v-model="selectedContainer">
        <Option
          v-for="(container, index) in containers"
          :key="index"
        >
          {{ container }}
        </Option>
      </Select>
      <SelectSeatBox
        :key="selectedContainer"
        :container="selectedContainer"
        :selected-seat="selectedSeat"
        :disabled-seat="disabledSeat"
        :on-toggle-seat="toggleSeat"
        :all-seats="seats"
      />
    </div>

    <div class="flex w-full justify-between my-5">
      <TypographySubTitle1>선택 좌석</TypographySubTitle1>
      <div class="flex gap-3">
        <TypographySubTitle1
          v-for="(seat, index) in selectedSeat"
          :key="index"
        >
          {{ seat.seatRoomNo + '-' + seat.seatNumber }}
        </TypographySubTitle1>
      </div>
    </div>
    <div class="flex w-full justify-between">
      <ButtonMediumSub>취소</ButtonMediumSub>
      <ButtonMediumMain @click="selectSeatFunction">
        예약하기
      </ButtonMediumMain>
    </div>
  </div>
</template>
<script setup lang="ts">
import { containers, ItemType, type TransportationSeat } from '@/entities/trip/trip.entity'
import { reservationItemInfoMockData } from '@/entities/trip/trip.mock'
import {
  getTransportationSeatsStatus,
  selectSeat,
} from '@/features/trip/Reservation/services/reservation.service'
import ItemInfo from '@/features/trip/Reservation/ui/ItemInfo.vue'
import SelectSeatBox from '@/features/trip/Reservation/ui/SelectSeatBox.vue'
import ButtonMediumMain from '@/shared/components/atoms/button/ButtonMediumMain.vue'
import ButtonMediumSub from '@/shared/components/atoms/button/ButtonMediumSub.vue'
import Option from '@/shared/components/atoms/input/Option.vue'
import Select from '@/shared/components/atoms/input/Select.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tripId = route.params.tripId as string

const type = route.query.type as ItemType
const selectedStartDate = route.query.start_date as string
const selectedStartTime = route.query.start_time as string
const selectedOrigin = route.query.origin as string
const selectedDestination = route.query.destination as string

const itemId = route.query.itemId as string
const item = reservationItemInfoMockData
const selectedSeat = ref<TransportationSeat[]>([])
const disabledSeat = ref<TransportationSeat[]>([])

const selectedContainer = ref<string>(containers[0])
const seats = ref<TransportationSeat[]>([])

const toggleSeat = (seat: TransportationSeat) => {
  const exists = selectedSeat.value.includes(seat)
  if (exists) {
    selectedSeat.value = selectedSeat.value.filter((s) => s !== seat)
  } else {
    selectedSeat.value = [...selectedSeat.value, seat]
  }
}

async function getTransportationSeatStatusFunction() {
  const result = await getTransportationSeatsStatus(localStorage.getItem('accessToken')!, itemId)
  seats.value = result['7']
}

watch(selectedContainer, (newVal) => {
  if (newVal === '7칸') {
    getTransportationSeatStatusFunction()
  } else {
    seats.value = []
  }
})

onMounted(() => {
  if (selectedContainer.value === '7칸') {
    getTransportationSeatStatusFunction()
  }
})

async function selectSeatFunction() {
  const tranResIds = selectedSeat.value.map((seat) => seat.tranResId)
  try {
    const result = await selectSeat(
      localStorage.getItem('accessToken')!,
      tripId,
      tranResIds,
      selectedStartDate,
      selectedStartTime
    )

    localStorage.setItem('seat', JSON.stringify(selectedSeat.value))
    const query: Record<string, string | number | string[]> = {
      type: type,
      itemId: item.itemId,
    }
    query.start_date = selectedStartDate
    query.origin = selectedOrigin
    query.destination = selectedDestination
    query.start_time = selectedStartTime
    query.reservation_num = result

    router.push({ name: 'reservation_transportation', params: { tripId }, query })
    console.log(result)
  } catch (e) {
    console.error(e)
  }
}
</script>
