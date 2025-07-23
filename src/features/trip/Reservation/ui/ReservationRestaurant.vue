<template>
  <div class="flex flex-col gap-2 h-[180px]">
    <TypographyP1 class="pl-1">
      카테고리
    </TypographyP1>
    <Select placeholder="카테고리를 선택해주세요">
      <Option />
    </Select>
  </div>
  <ButtonMain>검색하기</ButtonMain>
  <FilteredList :available-reservation-list="availableReservationList" />
</template>
<script setup lang="ts">
import { availableReservationListMockData } from '@/entities/trip/trip.mock'
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import Option from '@/shared/components/atoms/input/Option.vue'
import Select from '@/shared/components/atoms/input/Select.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import FilteredList from './FilteredList.vue'

const availableReservationList = availableReservationListMockData
</script>
