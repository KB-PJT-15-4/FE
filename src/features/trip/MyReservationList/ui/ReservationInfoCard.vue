<template>
  <div
    class="fixed overflow-scroll flex flex-col top-0 left-0 w-full h-full bg-black bg-opacity-30 z-50 justify-start py-[100px] items-center"
  >
    <Card
      v-for="(res, index) in info"
      :key="index"
      class="bg-white min-h-[550px] my-8"
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
        v-if="res.details.type === 'ACCOMMODATION'"
        class="flex flex-col justify-center items-center w-full"
      >
        <TypographyHead1>
          {{ (res.details as AccommodationInfoItem).hotelName }}
        </TypographyHead1>
        <div class="w-[250px] flex justify-between mt-5">
          <TypographyP1> 방 타입</TypographyP1>
          <TypographyP1>
            {{ (res.details as AccommodationInfoItem).roomType }}
          </TypographyP1>
        </div>
        <div class="w-[250px] flex justify-between">
          <TypographyP1> 체크인</TypographyP1>
          <TypographyP1>
            {{ (res.details as AccommodationInfoItem).checkinDay }}
          </TypographyP1>
        </div>
        <div class="w-[250px] flex justify-between">
          <TypographyP1> 체크아웃</TypographyP1>
          <TypographyP1>
            {{ (res.details as AccommodationInfoItem).checkoutDay }}
          </TypographyP1>
        </div>
        <div class="w-[250px] flex justify-between">
          <TypographyP1> 인원</TypographyP1>
          <TypographyP1> {{ (res.details as AccommodationInfoItem).guests }} 명 </TypographyP1>
        </div>

        <TypographySubTitle1 class="mt-4">
          {{ (res.details as AccommodationInfoItem).address }}
        </TypographySubTitle1>
      </div>

      <!-- Restaurant -->
      <div
        v-else-if="res.details.type === 'RESTAURANT'"
        class="flex flex-col justify-center items-center w-full"
      >
        <TypographyHead1>
          {{ (res.details as RestaurantInfoItem).restName }}
        </TypographyHead1>
        <div class="w-[250px] flex justify-between mt-5">
          <TypographyP1> 예약 시간</TypographyP1>
          <TypographyP1>
            {{ (res.details as RestaurantInfoItem).date }}
            {{ (res.details as RestaurantInfoItem).time }}
          </TypographyP1>
        </div>
        <div class="w-[250px] flex justify-between">
          <TypographyP1> 인원</TypographyP1>
          <TypographyP1> {{ (res.details as RestaurantInfoItem).resNum }}명 </TypographyP1>
        </div>
        <TypographySubTitle1 class="mt-7">
          {{ (res.details as RestaurantInfoItem).address }}
        </TypographySubTitle1>
      </div>

      <!-- Transportation -->
      <div
        v-else
        class="flex flex-col justify-center items-center w-full"
      >
        <TypographyHead1>
          {{ (res.details as TransportInfoItem).trainNo }}
        </TypographyHead1>
        <div class="w-[250px] flex justify-between">
          <TypographyP1>좌석</TypographyP1>
          <TypographyP1>
            {{ (res.details as TransportInfoItem).seatRoomNo }}호차
            {{ (res.details as TransportInfoItem).seatNumber }}번
          </TypographyP1>
        </div>
        <div class="w-[250px] flex justify-between mt-5">
          <TypographyP1>
            출발: {{ (res.details as TransportInfoItem).departureName }}
          </TypographyP1>
          <TypographyP1>
            {{ (res.details as TransportInfoItem).departureTime }}
          </TypographyP1>
        </div>

        <div class="w-[250px] flex justify-between">
          <TypographyP1> 도착: {{ (res.details as TransportInfoItem).arrivalName }} </TypographyP1>
          <TypographyP1>
            {{ (res.details as TransportInfoItem).arrivalTime }}
          </TypographyP1>
        </div>
      </div>
    </Card>
  </div>
</template>
<script setup lang="ts">
import type {
  AccommodationInfoItem,
  Reservation,
  RestaurantInfoItem,
  TransportInfoItem,
} from '@/entities/trip/trip.entity'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import { onMounted, ref } from 'vue'
import { getReservationQR } from '../services/myReservationList.service'

const props = defineProps<{
  itemId: number
}>()
const emit = defineEmits(['close'])

const info = ref<Reservation[]>()

async function getReservationQRFunction() {
  try {
    const result = await getReservationQR(localStorage.getItem('accessToken')!, props.itemId)
    info.value = result
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
