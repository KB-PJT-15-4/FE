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
      />
    </div>

    <div class="flex w-full justify-between my-5">
      <TypographySubTitle1>선택 좌석</TypographySubTitle1>
      <div class="flex gap-3">
        <TypographySubTitle1
          v-for="(seat, index) in selectedSeat"
          :key="index"
        >
          {{ seat }}
        </TypographySubTitle1>
      </div>
    </div>
    <div class="flex w-full justify-between">
      <ButtonMediumSub>취소</ButtonMediumSub>
      <ButtonMediumMain
        @click="
          // 좌석에 락 거는 api 호출 필요
          () => {
            const query: Record<string, string | number | string[]> = {
              type: type,
              itemId: item.itemId,
            }

            query.seat = selectedSeat
            query.start_date = selectedStartDate
            query.origin = selectedOrigin
            query.destination = selectedDestination
            query.start_time = selectedStartTime

            router.push({ name: 'reservation', params: { tripId }, query })
          }
        "
      >
        예약하기
      </ButtonMediumMain>
    </div>
  </div>
</template>
<script setup lang="ts">
import { containers, ItemType, type TransportationSeat } from '@/entities/trip/trip.entity'
import { reservationItemInfoMockData } from '@/entities/trip/trip.mock'
import { getTransportationSeatsStatus } from '@/features/trip/Reservation/services/reservation.service'
import ItemInfo from '@/features/trip/Reservation/ui/ItemInfo.vue'
import SelectSeatBox from '@/features/trip/Reservation/ui/SelectSeatBox.vue'
import ButtonMediumMain from '@/shared/components/atoms/button/ButtonMediumMain.vue'
import ButtonMediumSub from '@/shared/components/atoms/button/ButtonMediumSub.vue'
import Option from '@/shared/components/atoms/input/Option.vue'
import Select from '@/shared/components/atoms/input/Select.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import { onMounted, ref } from 'vue'
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
const selectedSeat = ref<string[]>([])
const disabledSeat = ref<string[]>(['A1', 'A2'])

const selectedContainer = ref<string>(containers[0])
const seats = ref<TransportationSeat[]>([])

const toggleSeat = (seat: string) => {
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

onMounted(() => {
  getTransportationSeatStatusFunction()
})
</script>
