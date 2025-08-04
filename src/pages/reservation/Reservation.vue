<template>
  <div class="flex w-full flex-col gap-3">
    <TypographyHead3>예약하기</TypographyHead3>
    <ItemInfo
      :item="item"
      class="mb-3"
    />

    <div class="h-[430px]">
      <!-- 숙박 -->
      <div
        v-if="type === ItemType.Accommodation"
        class="flex flex-col gap-3"
      >
        <div class="flex">
          <TypographySubTitle2 class="w-[80px]">
            입실 일자
          </TypographySubTitle2>
          <TypographyP1>
            {{
              formatFullDateToKorean(
                new Date((reservationInfo as AccommodationReservation).startDate)
              )
            }}
          </TypographyP1>
        </div>
        <div class="flex">
          <TypographySubTitle2 class="w-[80px]">
            퇴실 일자
          </TypographySubTitle2>
          <TypographyP1>
            {{
              formatFullDateToKorean(
                new Date((reservationInfo as AccommodationReservation).endDate)
              )
            }}
          </TypographyP1>
        </div>
        <div class="flex flex-col gap-3 mt-10">
          <div class="flex w-full items-center justify-start">
            <TypographySubTitle2 class="w-[50px]">
              인원
            </TypographySubTitle2>
            <PersonnelTab
              v-model="selectedN"
              :personnel="6"
            />
          </div>
          <div class="flex w-full items-center justify-start">
            <TypographySubTitle2 class="w-[50px]">
              시간
            </TypographySubTitle2>
            <div class="max-w-[310px] overflow-scroll">
              <SegmentedTab
                v-model="selectedTime"
                :options="reservationTime"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 교통 -->
      <div
        v-if="type === ItemType.Transportation"
        class="flex flex-col gap-3"
      >
        <div class="flex">
          <TypographySubTitle1 class="w-[80px]">
            출발 일자
          </TypographySubTitle1>
          <TypographyP1>
            {{
              formatFullDateToKorean(new Date((reservationInfo as TransportationReservation).date))
            }}
            {{ (reservationInfo as TransportationReservation).time }}
          </TypographyP1>
        </div>
        <div class="flex">
          <TypographySubTitle2 class="w-[80px]">
            출발지
          </TypographySubTitle2>
          <TypographyP1>{{ (reservationInfo as TransportationReservation).origin }}</TypographyP1>
        </div>
        <div class="flex">
          <TypographySubTitle2 class="w-[80px]">
            도착지
          </TypographySubTitle2>
          <TypographyP1>
            {{ (reservationInfo as TransportationReservation).destination }}
          </TypographyP1>
        </div>

        <div class="flex">
          <TypographySubTitle2 class="w-[80px]">
            선택 좌석
          </TypographySubTitle2>
          <TypographyP1
            v-for="(seat, index) in (reservationInfo as TransportationReservation).seat"
            :key="index"
            class="pr-3"
          >
            {{ seat }}
          </TypographyP1>
        </div>
      </div>

      <!-- 식당 -->
      <div
        v-if="type === ItemType.Restaurant"
        class="flex flex-col gap-3"
      >
        <div class="flex">
          <TypographySubTitle2 class="w-[80px]">
            카테고리
          </TypographySubTitle2>
          <TypographyP1>{{ (reservationInfo as RestaurantReservation).category }}</TypographyP1>
        </div>
        <div class="flex">
          <TypographySubTitle2 class="w-[80px]">
            예약 일자
          </TypographySubTitle2>
          <TypographyP1>
            {{ formatFullDateToKorean(new Date((reservationInfo as RestaurantReservation).date)) }}
          </TypographyP1>
        </div>
        <div class="flex flex-col gap-3 mt-10">
          <div class="flex w-full items-center justify-start">
            <TypographySubTitle2 class="w-[50px]">
              시간
            </TypographySubTitle2>
            <div class="max-w-[310px] overflow-scroll">
              <SegmentedTab
                v-model="selectedTime"
                :options="availableTime"
              />
            </div>
          </div>
          <TypographyCaption class="w-full text-right">
            {{ selectedTime }} 예약 가능 최대 인원: {{ selectedAvailableNum }}명
          </TypographyCaption>

          <div class="flex w-full items-center justify-start">
            <TypographySubTitle2 class="w-[50px]">
              인원
            </TypographySubTitle2>
            <PersonnelTab
              v-model="selectedN"
              :personnel="6"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 가격 및 결제 -->
  <div class="w-full flex justify-between">
    <TypographyHead3>결제 금액</TypographyHead3>
    <TypographyHead3 v-if="type == ItemType.Accommodation || type == ItemType.Transportation">
      {{ formatNumber(item.price! * selectedN) }} 원
    </TypographyHead3>
    <TypographyHead3
      v-if="type == ItemType.Restaurant"
      class="text-moa-sub-text"
    >
      결제가 필요하지 않습니다.
    </TypographyHead3>
  </div>
  <div class="w-full flex justify-between">
    <ButtonMediumSub>취소하기</ButtonMediumSub>
    <ButtonMediumMain
      @click="router.push({ name: 'pay', params: { tripId }, query: getReservationQuery() })"
    >
      예약하기
    </ButtonMediumMain>
  </div>
</template>
<script setup lang="ts">
import {
  ItemType,
  reservationTime,
  type AccommodationReservation,
  type RestaurantReservation,
  type RestaurantTimeSlot,
  type TransportationReservation,
} from '@/entities/trip/trip.entity'
import { reservationItemInfoMockData } from '@/entities/trip/trip.mock'
import { getAvailableTimeTimeList } from '@/features/trip/Reservation/services/reservation.service'
import ItemInfo from '@/features/trip/Reservation/ui/ItemInfo.vue'
import ButtonMediumMain from '@/shared/components/atoms/button/ButtonMediumMain.vue'
import ButtonMediumSub from '@/shared/components/atoms/button/ButtonMediumSub.vue'
import TypographyCaption from '@/shared/components/atoms/typography/TypographyCaption.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import PersonnelTab from '@/shared/components/molecules/tab/PersonnelTab.vue'
import SegmentedTab from '@/shared/components/molecules/tab/SegmentedTab.vue'
import { formatFullDateToKorean, formatNumber } from '@/shared/utils/format'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tripId = route.params.tripId as string

const type = route.query.type as ItemType
const itemId = route.query.itemId as string
const item = reservationItemInfoMockData // 추후 itemId, type을 통해 받아올 예정

const selectedN = ref(1)

const availableTimeSlot = ref<RestaurantTimeSlot[]>([])

const availableTime = ref<string[]>([])
const selectedTime = ref<string>('')

const selectedAvailableNum = computed(() => {
  return availableTimeSlot.value.find((slot) => slot.time === selectedTime.value)?.availableNum ?? 0
})

const reservationInfo = ref<
  AccommodationReservation | TransportationReservation | RestaurantReservation | null
>(null)

if (type === ItemType.Accommodation) {
  reservationInfo.value = {
    itemId,
    startDate: route.query.start_date as string,
    endDate: route.query.end_date as string,
  }
}

if (type === ItemType.Transportation) {
  reservationInfo.value = {
    itemId,
    origin: route.query.origin as string,
    destination: route.query.destination as string,
    date: route.query.start_date as string,
    seat: route.query.seat as string[],
    time: route.query.start_time as string,
  }
}

if (type === ItemType.Restaurant) {
  reservationInfo.value = {
    itemId,
    category: route.query.category as string,
    date: route.query.date as string,
  }
}

function getReservationQuery(): Record<string, string | number | string[]> {
  const base = {
    type,
    itemId,
  }

  if (type === ItemType.Accommodation) {
    const r = reservationInfo.value as AccommodationReservation
    return {
      ...base,
      start_date: r.startDate,
      end_date: r.endDate,
      price: item.price! * selectedN.value, // 추후 방 타입에 따라 차등 요금제 적용 필요
    }
  }

  if (type === ItemType.Transportation) {
    const r = reservationInfo.value as TransportationReservation
    return {
      ...base,
      origin: r.origin,
      destination: r.destination,
      start_date: r.date,
      start_time: r.time,
      seat: r.seat,
      price: item.price! * selectedN.value,
    }
  }

  const r = reservationInfo.value as RestaurantReservation
  return {
    ...base,
    date: r.date,
    category: r.category,
  }
}

async function getAvailableTimeListFunction() {
  try {
    availableTimeSlot.value = await getAvailableTimeTimeList(
      localStorage.getItem('accessToken')!,
      itemId,
      route.query.date as string
    )

    availableTime.value = availableTimeSlot.value.map((slot) => slot.time)
    selectedTime.value = availableTime.value[0]
  } catch (e) {
    console.error(e)
    alert('예약 가능 시간대를 조회하는데 실패하였습니다.')
  }
}

onMounted(() => {
  getAvailableTimeListFunction()
})
</script>
