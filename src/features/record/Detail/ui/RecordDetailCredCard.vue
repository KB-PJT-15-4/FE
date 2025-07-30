<template>
  <Card
    v-for="(payment, index) in creditList"
    :key="index"
    class="flex justify-between items-center p-4"
  >
    <div>
      <p class="text-sm text-[#626262]">
        {{ formatFullDateToKorean(new Date(payment.date)) }}
      </p>
      <p class="font-semibold text-base">
        {{ payment.title }}
      </p>
    </div>
    <p class="font-bold text-lg">
      {{ formatCurrency(payment.cost) }}
    </p>
  </Card>
</template>

<script setup lang="ts">
import { formatFullDateToKorean, formatCurrency } from '@/shared/utils/format'
import Card from '@/shared/components/atoms/card/Card.vue'

const { creditList } = defineProps<{
  creditList: {
    title: string
    date: string
    cost: number
  }[]
}>()
</script>
