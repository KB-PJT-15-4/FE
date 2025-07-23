<template>
  <div class="h-[190px] flex flex-col gap-5">
    <div class="flex w-full justify-between">
      <div class="flex flex-col gap-2 w-full">
        <TypographyP1 class="pl-1">
          입실 날짜
        </TypographyP1>
        <InputSmall type="date" />
      </div>
      <div class="flex flex-col gap-2 w-full">
        <TypographyP1 class="pl-1">
          퇴실 날짜
        </TypographyP1>
        <InputSmall type="date" />
      </div>
    </div>
    <div class="flex items-center">
      <TypographyP1 class="w-[80px] pl-1">
        인원
      </TypographyP1>
      <PersonnelTab
        v-model="selectedN"
        :personnel="6"
      />
    </div>
  </div>
  <ButtonMain>검색하기</ButtonMain>
  <FilteredList :available-reservation-list="availableReservationList" />
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { availableReservationListMockData } from '@/entities/trip/trip.mock'
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import InputSmall from '@/shared/components/atoms/input/InputSmall.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import PersonnelTab from '@/shared/components/molecules/tab/PersonnelTab.vue'
import FilteredList from './FilteredList.vue'

const selectedN = ref(1)
const availableReservationList = availableReservationListMockData
</script>
