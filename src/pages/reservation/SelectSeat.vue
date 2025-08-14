<template>
  <div class="w-full flex flex-col justify-center">
    <TypographyHead3 class="mb-3">
      좌석 선택하기
    </TypographyHead3>
    <ItemInfoTransportation
      v-if="item"
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
      <ButtonMediumSub @click="cancelSelectSeat">
        취소
      </ButtonMediumSub>
      <ButtonMediumMain @click="selectSeatFunction">
        예약하기
      </ButtonMediumMain>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  containers,
  ItemType,
  type TransportationItem,
  type TransportationSeat,
} from '@/entities/trip/trip.entity'
import {
  getTransportationSeatsStatus,
  selectSeat,
} from '@/features/trip/Reservation/services/reservation.service'
import ItemInfoTransportation from '@/features/trip/Reservation/ui/ItemInfoTransportation.vue'
import SelectSeatBox from '@/features/trip/Reservation/ui/SelectSeatBox.vue'
import ButtonMediumMain from '@/shared/components/atoms/button/ButtonMediumMain.vue'
import ButtonMediumSub from '@/shared/components/atoms/button/ButtonMediumSub.vue'
import Option from '@/shared/components/atoms/input/Option.vue'
import Select from '@/shared/components/atoms/input/Select.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
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
const trainNo = route.query.trainNo as string

const itemId = route.query.itemId as string
const item = ref<TransportationItem>()
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

async function getTransportationSeatStatusFunction(container: string) {
  const result = await getTransportationSeatsStatus(itemId)
  seats.value = result[container]
  setDisabledSeat()
}

watch(selectedContainer, (newVal) => {
  getTransportationSeatStatusFunction(newVal.split('')[0])
})

onMounted(() => {
  getTransportationSeatStatusFunction('1')
})

async function selectSeatFunction() {
  const tranResIds = selectedSeat.value.map((seat) => seat.tranResId)
  try {
    const result = await selectSeat(tripId, tranResIds, selectedStartDate, selectedStartTime)

    localStorage.setItem('seat', JSON.stringify(selectedSeat.value))
    const query: Record<string, string | number | string[]> = {
      type: type,
      itemId: itemId,
      start_date: selectedStartDate,
      origin: selectedOrigin,
      destination: selectedDestination,
      start_time: selectedStartTime,
      reservation_num: result,
      trainNo: trainNo,
    }

    router.push({ name: 'reservation_transportation', params: { tripId }, query })
  } catch (e) {
    console.error(e)
  }
}

function setItemInfo() {
  item.value = {
    transportId: Number(route.query.itemId),
    trainNo: route.query.trainNo as string,
    departureName: route.query.origin as string,
    origin: route.query.origin as string,
    destination: route.query.destination as string,
    startDate: route.query.start_date as string,
    startTime: route.query.start_time as string,
  }
}

function cancelSelectSeat() {
  if (window.confirm('예약을 취소하시겠습니까?')) {
    router.replace({
      name: 'trip_detail',
      params: { tripId: tripId },
      query: { tab: 'reservation' },
    })
  }
}

function setDisabledSeat() {
  disabledSeat.value = seats.value.filter(
    (seat) => seat.status === 'CONFIRMED' || seat.status === 'PENDING'
  )
}

onMounted(() => {
  setItemInfo()
})
</script>
