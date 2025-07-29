<template>
  <div class="flex flex-col gap-2 mb-3">
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
    <div class="flex flex-col gap-2">
      <TypographyP1 class="pl-1">
        출발 시간
      </TypographyP1>
      <Select v-model="selectedStartTime">
        <Option
          v-for="(item, index) in timeOptions"
          :key="index"
        >
          {{ item }}
        </Option>
      </Select>
    </div>
  </div>
  <ButtonGhost><TypographySubTitle1>검색하기</TypographySubTitle1> </ButtonGhost>
  <FilteredList :available-reservation-list="availableReservationList" />
</template>
<script setup lang="ts">
import { locationList } from '@/entities/trip/trip.entity'
import { availableTransportationReservationListMockData } from '@/entities/trip/trip.mock'
import ButtonGhost from '@/shared/components/atoms/button/ButtonGhost.vue'
import Input from '@/shared/components/atoms/input/Input.vue'
import Option from '@/shared/components/atoms/input/Option.vue'
import Select from '@/shared/components/atoms/input/Select.vue'
import SelectSmall from '@/shared/components/atoms/input/SelectSmall.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import { provide, ref } from 'vue'
import FilteredList from './FilteredList.vue'

const availableReservationList = availableTransportationReservationListMockData

const selectedOrigin = ref(locationList[0])
const selectedDestination = ref(locationList[0])

const today = new Date()
const selectedStartDate = ref(today.toISOString().split('T')[0])

const timeOptions = ['07:30', '10:00', '12:30', '14:00', '15:30', '18:00', '19:30', '21:00']
const selectedStartTime = ref(timeOptions[0])
provide('selectedStartDate', selectedStartDate)
provide('selectedStartTime', selectedStartTime)
provide('selectedOrigin', selectedOrigin)
provide('selectedDestination', selectedDestination)
</script>
