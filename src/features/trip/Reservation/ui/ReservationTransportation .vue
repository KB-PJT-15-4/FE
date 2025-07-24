<template>
  <div class="h-[190px] flex flex-col gap-2">
    <div class="flex w-full justify-between">
      <div class="flex flex-col gap-2 w-full">
        <TypographyP1 class="pl-1">
          출발지
        </TypographyP1>
        <SelectSmall
          v-model="selectedOrigin"
          placeholder="출발지 선택"
        >
          <Option
            v-for="(location, index) in locationList"
            :key="index"
            :value="location"
          >
            {{ location }}
          </Option>
        </SelectSmall>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <TypographyP1 class="pl-1">
          도착지
        </TypographyP1>
        <SelectSmall
          v-model="selectedDestination"
          placeholder="도착지 선택"
        >
          <Option
            v-for="(location, index) in locationList"
            :key="index"
            :value="location"
          >
            {{ location }}
          </Option>
        </SelectSmall>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <TypographyP1 class="pl-1">
        출발 날짜
      </TypographyP1>
      <Input
        v-model="selectedStartDate"
        type="date"
      />
    </div>
  </div>
  <ButtonMain>검색하기</ButtonMain>
  <FilteredList :available-reservation-list="availableReservationList" />
</template>
<script setup lang="ts">
import { availableTransportationReservationListMockData } from '@/entities/trip/trip.mock'
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import Input from '@/shared/components/atoms/input/Input.vue'
import Option from '@/shared/components/atoms/input/Option.vue'
import SelectSmall from '@/shared/components/atoms/input/SelectSmall.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import { locationList } from '@/shared/constants/ReservationValue'
import { provide, ref } from 'vue'
import FilteredList from './FilteredList.vue'

const availableReservationList = availableTransportationReservationListMockData

const selectedOrigin = ref(locationList[0])
const selectedDestination = ref(locationList[0])

const today = new Date()
const selectedStartDate = ref(today.toISOString().split('T')[0])

provide('selectedStartDate', selectedStartDate)
provide('selectedOrigin', selectedOrigin)
provide('selectedDestination', selectedDestination)
</script>
