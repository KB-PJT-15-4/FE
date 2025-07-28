<template>
  <div class="flex flex-col gap-5 mb-3">
    <div class="flex w-full justify-between">
      <div class="flex flex-col gap-2 w-full">
        <TypographyP1 class="pl-1">
          입실 날짜
        </TypographyP1>
        <InputSmall
          v-model="selectedStartDate"
          type="date"
        />
      </div>
      <div class="flex flex-col gap-2 w-full">
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
  <ButtonMain>검색하기</ButtonMain>
  <FilteredList :available-reservation-list="availableReservationList" />
</template>
<script setup lang="ts">
import { provide, ref } from 'vue'

import { availableAccommodationReservationListMockData } from '@/entities/trip/trip.mock'
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import InputSmall from '@/shared/components/atoms/input/InputSmall.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import FilteredList from './FilteredList.vue'

const availableReservationList = availableAccommodationReservationListMockData

const today = new Date()
const selectedStartDate = ref(today.toISOString().split('T')[0])
const selectedEndDate = ref(today.toISOString().split('T')[0])

provide('selectedStartDate', selectedStartDate)
provide('selectedEndDate', selectedEndDate)
</script>
