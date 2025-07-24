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
            {{
              location
            }}
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
            {{
              location
            }}
          </Option>
        </SelectSmall>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <TypographyP1 class="pl-1">
        출발 날짜
      </TypographyP1>
      <Input type="date" />
    </div>
  </div>
  <ButtonMain>검색하기</ButtonMain>
  <FilteredList :available-reservation-list="availableReservationList" />
</template>
<script setup lang="ts">
import { availableReservationListMockData } from '@/entities/trip/trip.mock'
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import Input from '@/shared/components/atoms/input/Input.vue'
import Option from '@/shared/components/atoms/input/Option.vue'
import SelectSmall from '@/shared/components/atoms/input/SelectSmall.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import { locationList } from '@/shared/constants/ReservationValue'
import { ref } from 'vue'
import FilteredList from './FilteredList.vue'

const availableReservationList = availableReservationListMockData

const selectedOrigin = ref(locationList[0])
const selectedDestination = ref(locationList[0])
console.log(locationList)
</script>
