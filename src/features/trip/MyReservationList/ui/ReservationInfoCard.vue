<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-50 flex justify-center items-center"
  >
    <Card
      v-for="(res, index) in info"
      :key="index"
      class="bg-white h-[550px] my-8"
    >
      <div class="w-full flex justify-end">
        <button @click="emit('close')">
          <i class="bi bi-x text-[30px]" />
        </button>
      </div>
      <TypographyHead1 class="text-center">
        예약권
      </TypographyHead1>
      <div class="w-full flex justify-center">
        <img
          :src="'data:image/png;base64,' + res.qrCodeString"
          class="h-[240px]"
        >
      </div>

      <!-- Accommodation -->
      <div
        v-if="res.reservationDetails && res.reservationDetails.type === 'ACCOMMODATION'"
        class="flex flex-col justify-center items-center w-full"
      >
        <TypographyHead1>
          {{ (res.reservationDetails as AccommodationItem).hotelName }}
        </TypographyHead1>
        <div class="w-[250px] flex justify-between mt-5">
          <TypographyP1> 방 타입</TypographyP1>
          <TypographyP1>
            {{ (res.reservationDetails as AccommodationItem).roomType }}
          </TypographyP1>
        </div>
        <div class="w-[250px] flex justify-between">
          <TypographyP1> 체크인</TypographyP1>
          <TypographyP1>
            {{ (res.reservationDetails as AccommodationItem).checkinDay }}
          </TypographyP1>
        </div>
        <div class="w-[250px] flex justify-between">
          <TypographyP1> 체크아웃</TypographyP1>
          <TypographyP1>
            {{ (res.reservationDetails as AccommodationItem).checkoutDay }}
          </TypographyP1>
        </div>
        <div class="w-[250px] flex justify-between">
          <TypographyP1> 인원</TypographyP1>
          <TypographyP1>
            {{ (res.reservationDetails as AccommodationItem).guests }} 명
          </TypographyP1>
        </div>

        <TypographySubTitle1 class="mt-4">
          {{ (res.reservationDetails as AccommodationItem).address }}
        </TypographySubTitle1>
      </div>

      <!-- Restaurant -->
      <div
        v-else-if="res.reservationDetails && res.reservationDetails.type === 'RESTAURANT'"
        class="flex flex-col justify-center items-center w-full"
      >
        <TypographyHead1>
          {{ (res.reservationDetails as RestaurantItem).restName }}
        </TypographyHead1>
        <div class="w-[250px] flex justify-between mt-5">
          <TypographyP1> 예약 시간</TypographyP1>
          <TypographyP1>
            {{ (res.reservationDetails as RestaurantItem).date }}
            {{ (res.reservationDetails as RestaurantItem).time }}
          </TypographyP1>
        </div>
        <div class="w-[250px] flex justify-between">
          <TypographyP1> 인원</TypographyP1>
          <TypographyP1> {{ (res.reservationDetails as RestaurantItem).resNum }}명 </TypographyP1>
        </div>
        <TypographySubTitle1 class="mt-7">
          {{ (res.reservationDetails as RestaurantItem).address }}
        </TypographySubTitle1>
      </div>

      <!-- Transportation -->
      <div
        v-else-if="res.seatDetails"
        class="flex flex-col justify-center items-center w-full"
      >
        <TypographyHead1>
          {{ (res.seatDetails as TransportItem).trainNo }}
        </TypographyHead1>
        <div class="w-[250px] flex justify-between">
          <TypographyP1>좌석</TypographyP1>
          <TypographyP1>
            {{ (res.seatDetails as TransportItem).seatRoomNo }}호차
            {{ (res.seatDetails as TransportItem).seatNumber }}번
          </TypographyP1>
        </div>
        <div class="w-[250px] flex justify-between mt-5">
          <TypographyP1>
            출발: {{ (res.seatDetails as TransportItem).departureName }}
          </TypographyP1>
          <TypographyP1>
            {{ (res.seatDetails as TransportItem).departureTime }}
          </TypographyP1>
        </div>

        <div class="w-[250px] flex justify-between">
          <TypographyP1> 도착: {{ (res.seatDetails as TransportItem).arrivalName }} </TypographyP1>
          <TypographyP1>
            {{ (res.seatDetails as TransportItem).arrivalTime }}
          </TypographyP1>
        </div>
      </div>
    </Card>
  </div>
</template>
<script setup lang="ts">
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import { onMounted, ref } from 'vue'
import { getReservationQR } from '../services/myReservationList.service'

interface Item {
  type: string
  status: string
}

interface RestaurantItem extends Item {
  reservationId: number
  restName: string
  address: string
  date: string
  time: string
  resNum: number
  status: string
}

interface AccommodationItem extends Item {
  reservationId: number
  hotelName: string
  address: string
  roomType: string
  checkinDay: string
  checkoutDay: string
  guests: number
  location: string
}

interface TransportItem extends Item {
  tranResId: number
  reservationId: number
  trainNo: string
  departureName: string
  arrivalName: string
  departureTime: string
  arrivalTime: string
  seatRoomNo: number
  seatNumber: string
  seatType: string
}

interface Reservation {
  qrCodeString: string
  reservationDetails?: RestaurantItem | AccommodationItem
  seatDetails?: TransportItem
}

const props = defineProps<{
  itemId: number
}>()
const emit = defineEmits(['close'])

const info = ref<Reservation[]>()

async function getReservationQRFunction() {
  try {
    const result = await getReservationQR(localStorage.getItem('accessToken')!, props.itemId)
    if (Array.isArray(result)) {
      info.value = result
    } else {
      info.value = [result]
    }
  } catch (e) {
    console.error(e)
    alert('예약 QR을 불러오는데 실패하였습니다.')
    emit('close')
  }
}

onMounted(() => {
  getReservationQRFunction()
})
</script>
