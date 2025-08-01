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
            :key="row + '1' + (isSelected(row + '1') ? 'on' : 'off')"
            :label="1"
            :seat-key="row + '1'"
            :selected="isSelected(row + '1')"
            :disabled="isDisabled(row + '1')"
            @click="
              () => {
                const seat = findSeat(row + '1')
                if (seat) onToggleSeat(seat)
              }
            "
          />
          <SeatButton
            :key="row + '2' + (isSelected(row + '2') ? 'on' : 'off')"
            :label="2"
            :seat-key="row + '2'"
            :selected="isSelected(row + '2')"
            :disabled="isDisabled(row + '2')"
            @click="
              () => {
                const seat = findSeat(row + '2')
                if (seat) onToggleSeat(seat)
              }
            "
          />
        </div>

        <!-- 가운데 라벨 -->
        <div class="flex items-center justify-center font-medium text-sm">
          {{ row }}
        </div>

        <!-- 우측 좌석 -->
        <div class="flex gap-5">
          <SeatButton
            :key="row + '4' + (isSelected(row + '4') ? 'on' : 'off')"
            :label="4"
            :seat-key="row + '4'"
            :selected="isSelected(row + '4')"
            :disabled="isDisabled(row + '4')"
            @click="
              () => {
                const seat = findSeat(row + '4')
                if (seat) onToggleSeat(seat)
              }
            "
          />
          <SeatButton
            :key="row + '3' + (isSelected(row + '3') ? 'on' : 'off')"
            :label="3"
            :seat-key="row + '3'"
            :selected="isSelected(row + '3')"
            :disabled="isDisabled(row + '3')"
            @click="
              () => {
                const seat = findSeat(row + '3')
                if (seat) onToggleSeat(seat)
              }
            "
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
const rows = ['A', 'B', 'C', 'D', 'E', 'F']
const props = defineProps<{
  selectedSeat: TransportationSeat[]
  disabledSeat: TransportationSeat[]
  allSeats: TransportationSeat[]
  container: string
  onToggleSeat: (seat: TransportationSeat) => void
}>()

const findSeat = (seatNumber: string) => props.allSeats.find((s) => s.seatNumber === seatNumber)

const isSelected = (seatNumber: string) =>
  props.selectedSeat.some((seat) => seat.seatNumber === seatNumber)

const isDisabled = (seatNumber: string) =>
  props.disabledSeat.some((seat) => seat.seatNumber === seatNumber)
</script>
