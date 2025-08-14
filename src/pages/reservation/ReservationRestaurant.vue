<template>
  <div class="flex w-full flex-col gap-3">
    <TypographyHead3>예약하기</TypographyHead3>
    <ItemInfoRestaurant
      v-if="item"
      :item="item"
      class="mb-3"
    />

    <div class="h-[430px]">
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

    <TypographyHead3
      v-if="type == ItemType.Restaurant"
      class="text-moa-sub-text"
    >
      결제가 필요하지 않습니다.
    </TypographyHead3>
  </div>
  <div class="w-full flex justify-between">
    <ButtonMediumSub @click="cancelReservationFunction">
      취소하기
    </ButtonMediumSub>
    <ButtonMediumMain @click="reservationRestaurantFunction">
      예약하기
    </ButtonMediumMain>
  </div>
</template>
<script setup lang="ts">
import {
  ItemType,
  type RestaurantItem,
  type RestaurantReservation,
  type RestaurantTimeSlot,
} from '@/entities/trip/trip.entity'
import {
  getAvailableTimeTimeList,
  getRestaurantInfo,
  reservationRestaurant,
} from '@/features/trip/Reservation/services/reservation.service'
import ItemInfoRestaurant from '@/features/trip/Reservation/ui/ItemInfoRestaurant.vue'
import ButtonMediumMain from '@/shared/components/atoms/button/ButtonMediumMain.vue'
import ButtonMediumSub from '@/shared/components/atoms/button/ButtonMediumSub.vue'
import TypographyCaption from '@/shared/components/atoms/typography/TypographyCaption.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import PersonnelTab from '@/shared/components/molecules/tab/PersonnelTab.vue'
import SegmentedTab from '@/shared/components/molecules/tab/SegmentedTab.vue'
import { formatFullDateToKorean } from '@/shared/utils/format'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tripId = route.params.tripId as string

const type = route.query.type as ItemType
const itemId = route.query.itemId as string
const item = ref<RestaurantItem>()

const selectedN = ref(1)

const availableTimeSlot = ref<RestaurantTimeSlot[]>([])

const availableTime = ref<string[]>([])
const selectedTime = ref<string>('')

const selectedAvailableNum = computed(() => {
  return availableTimeSlot.value.find((slot) => slot.time === selectedTime.value)?.availableNum ?? 0
})

const reservationInfo = ref<RestaurantReservation | null>(null)

reservationInfo.value = {
  itemId,
  category: route.query.category as string,
  date: route.query.date as string,
}

async function getAvailableTimeListFunction() {
  try {
    availableTimeSlot.value = await getAvailableTimeTimeList(itemId, route.query.date as string)

    availableTime.value = availableTimeSlot.value.map((slot) => slot.time)
    selectedTime.value = availableTime.value[0]
  } catch (e) {
    console.error(e)
    alert('예약 가능 시간대를 조회하는데 실패하였습니다.')
  }
}

async function reservationRestaurantFunction() {
  try {
    if (window.confirm('식당을 예약하시겠습니까?')) {
      await reservationRestaurant(
        Number(tripId),
        Number(itemId),
        route.query.date as string,
        selectedTime.value,
        selectedN.value
      )
      alert('예약이 완료되었습니다. \n예매내역페이지로 이동합니다.')
      router.replace({ name: 'trip_detail', query: { tab: 'reservationList' } })
    }
  } catch (e) {
    console.error(e)
    alert('예약을 실패하였습니다.')
  }
}

function cancelReservationFunction() {
  try {
    if (window.confirm('선택한 식당 정보가 사라집니다.\n예약을 취소하시겠습니까?')) {
      router.replace({ name: 'trip_detail', query: { tab: 'reservationList' } })
    }
  } catch (e) {
    console.error(e)
    alert('취소를 완료하지 못하였습니다.')
  }
}

async function getRestaurantInfoFunction() {
  item.value = await getRestaurantInfo(itemId)
}

onMounted(() => {
  getRestaurantInfoFunction()
  if (type === ItemType.Restaurant) {
    getAvailableTimeListFunction()
  }
})
</script>
