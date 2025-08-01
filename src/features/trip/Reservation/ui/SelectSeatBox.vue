<template>
  <div class="w-full border p-3 rounded-sm my-3 flex flex-col items-center justify-center">
    <TypographySubTitle1 class="mb-3">
      {{ container }}
    </TypographySubTitle1>
    <div class="w-full flex-col">
      <div
        v-for="(row, rowIndex) in rows"
        :key="rowIndex"
        class="flex flex-row justify-between my-3"
      >
        <!-- 좌측 좌석 -->
        <div class="flex gap-5">
          <SeatButton
            :key="row + '1' + (selectedSeat.includes(row + '1') ? 'on' : 'off')"
            :label="1"
            :seat-key="row + '1'"
            :selected="selectedSeat.includes(row + '1')"
            :disabled="disabledSeat.includes(row + '1')"
            @click="onToggleSeat(row + '1')"
          />
          <SeatButton
            :key="row + '2' + (selectedSeat.includes(row + '2') ? 'on' : 'off')"
            :label="2"
            :seat-key="row + '2'"
            :selected="selectedSeat.includes(row + '2')"
            :disabled="disabledSeat.includes(row + '2')"
            @click="onToggleSeat(row + '2')"
          />
        </div>

        <!-- 가운데 라벨 -->
        <div class="flex items-center justify-center font-medium text-sm">
          {{ row }}
        </div>

        <!-- 우측 좌석 -->
        <div class="flex gap-5">
          <SeatButton
            :key="row + '4' + (selectedSeat.includes(row + '4') ? 'on' : 'off')"
            :label="4"
            :seat-key="row + '4'"
            :selected="selectedSeat.includes(row + '4')"
            :disabled="disabledSeat.includes(row + '4')"
            @click="onToggleSeat(row + '4')"
          />
          <SeatButton
            :key="row + '3' + (selectedSeat.includes(row + '3') ? 'on' : 'off')"
            :label="3"
            :seat-key="row + '3'"
            :selected="selectedSeat.includes(row + '3')"
            :disabled="disabledSeat.includes(row + '3')"
            @click="onToggleSeat(row + '3')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TransportationSeat } from '@/entities/trip/trip.entity'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import SeatButton from './SeatButton.vue'

defineProps<{
  selectedSeat: TransportationSeat[]
  disabledSeat: TransportationSeat[]
  container: string
  onToggleSeat: (seat: TransportationSeat) => void
}>()

const rows = ['A', 'B', 'C', 'D', 'E', 'F']
</script>
