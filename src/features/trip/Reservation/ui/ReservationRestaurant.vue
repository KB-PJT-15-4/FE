<template>
  <div class="flex flex-col gap-2 mb-3">
    <TypographyP1 class="pl-1">
      카테고리
    </TypographyP1>
    <Select
      v-model="selectedCategory"
      placeholder="카테고리를 선택해주세요"
    >
      <Option
        v-for="(type, index) in restaurantTypeList"
        :key="index"
        :value="type"
      >
        {{ type }}
      </Option>
    </Select>
    <TypographyP1 class="pl-1">
      예약 날짜
    </TypographyP1>
    <Input
      v-model="selectedDate"
      type="date"
    />
  </div>
  <ButtonGhost><TypographySubTitle1>검색하기</TypographySubTitle1> </ButtonGhost>
  <FilteredList :available-reservation-list="availableReservationList" />
</template>
<script setup lang="ts">
import { restaurantTypeList } from '@/entities/trip/trip.entity'
import { availableRestaurantReservationListMockData } from '@/entities/trip/trip.mock'
import ButtonGhost from '@/shared/components/atoms/button/ButtonGhost.vue'
import Input from '@/shared/components/atoms/input/Input.vue'
import Option from '@/shared/components/atoms/input/Option.vue'
import Select from '@/shared/components/atoms/input/Select.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import { provide, ref } from 'vue'
import FilteredList from './FilteredList.vue'

const availableReservationList = availableRestaurantReservationListMockData
const selectedCategory = ref(restaurantTypeList[0])

const today = new Date()
const selectedDate = ref(today.toISOString().split('T')[0])

provide('selectedStartDate', selectedDate)
provide('selectedCategory', selectedCategory)
</script>
