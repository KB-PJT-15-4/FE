<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-[360px]">
      <div class="flex flex-col gap-5 mb-3 w-full">
        <div class="grid grid-cols-2 gap-3 w-full">
          <div class="flex flex-col gap-2">
            <TypographyP1 class="pl-1">
              입실 날짜
            </TypographyP1>
            <InputSmall
              v-model="selectedStartDate"
              type="date"
            />
          </div>

          <div class="flex flex-col gap-2">
            <TypographyP1 class="pl-1">
              퇴실 날짜
            </TypographyP1>
            <InputSmall
              v-model="selectedEndDate"
              type="date"
            />
          </div>
        </div>
      </div>

      <ButtonGhost
        class="w-full"
        @click="getAvailableAccommodationList"
      >
        <TypographySubTitle1 class="w-full text-center">
          검색하기
        </TypographySubTitle1>
      </ButtonGhost>

      <div
        v-if="!availableReservationList"
        class="w-full h-[100px] flex justify-center items-center"
      >
        <TypographySubTitle1 class="text-moa-main-text text-center">
          숙박시설을 검색해보세요!
        </TypographySubTitle1>
      </div>

      <div
        v-else-if="availableReservationList.length === 0"
        class="w-full h-[100px] flex justify-center items-center"
      >
        <TypographySubTitle1 class="text-moa-main-text text-center">
          예약 가능한 숙박시설이 없습니다.
        </TypographySubTitle1>
      </div>

      <FilteredAccommodationList
        v-else
        :available-reservation-list="availableReservationList"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { provide, ref } from 'vue'

import type { AccommodationItem } from '@/entities/trip/trip.entity'
import ButtonGhost from '@/shared/components/atoms/button/ButtonGhost.vue'
import InputSmall from '@/shared/components/atoms/input/InputSmall.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import { useRoute } from 'vue-router'
import { getAccommodationList } from '../services/reservation.service'
import FilteredAccommodationList from './FilteredAccommodationList.vue'

const availableReservationList = ref<AccommodationItem[] | null>(null)

const today = new Date()
const selectedStartDate = ref(today.toISOString().split('T')[0])
const selectedEndDate = ref(today.toISOString().split('T')[0])

const route = useRoute()
const tripId = route.params.tripId as string

provide('selectedStartDate', selectedStartDate)
provide('selectedEndDate', selectedEndDate)

async function getAvailableAccommodationList() {
  if (selectedStartDate.value >= selectedEndDate.value) {
    alert('입실 날짜는 퇴실날짜보다 이전이어야합니다.')
    return
  }

  try {
    const result = await getAccommodationList(
      localStorage.getItem('accessToken')!,
      tripId,
      selectedStartDate.value,
      selectedEndDate.value
    )
    availableReservationList.value = await result.content
  } catch (e) {
    console.error(e)
    alert('예약 가능 리스트를 불러오는데 실패하였습니다.')
  }
}
</script>
