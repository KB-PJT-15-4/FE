<template>
  <ButtonExtraSmallMain
    class="w-[60px] mb-2 text-sm"
    @click="navigateToReport"
  >
    Report
  </ButtonExtraSmallMain>

  <!-- 결제 내역 카드들 -->
  <div>
    <Card
      v-for="payment in filteredPaymentRecords"
      :key="payment.paymentId"
      class="flex justify-between items-center p-4 mb-2"
    >
      <div>
        <TypographySubTitle1>{{ payment.paymentName }}</TypographySubTitle1>
        <TypographyP2 class="text-moa-gray-text">
          {{ formatFullDateToKorean(new Date(payment.paymentDate)) }}
        </TypographyP2>
      </div>
      <TypographyHead2>{{ formatCurrency(payment.paymentPrice) }}</TypographyHead2>
    </Card>

    <!-- 데이터가 없을 때 표시 -->
    <div
      v-if="filteredPaymentRecords.length === 0"
      class="text-center py-8 text-moa-gray-text"
    >
      {{ selectedDate ? '선택한 날짜에 결제 내역이 없습니다.' : '결제 내역이 없습니다.' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { formatCurrency, formatFullDateToKorean } from '@/shared/utils/format'
import type { ApiPaymentRecord } from '@/entities/record/record.entity'

import ButtonExtraSmallMain from '@/shared/components/atoms/button/ButtonExtraSmallMain.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyHead2 from '@/shared/components/atoms/typography/TypographyHead2.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'

import { fetchPaymentRecords } from '../services/recordDetail.service'

const { tripId, selectedDate } = defineProps<{
  tripId: number
  selectedDate?: string
}>()

const router = useRouter()
const route = useRoute()

const apiBaseUrl = import.meta.env.VITE_APP_API_URL
const paymentRecords = ref<ApiPaymentRecord[]>([])

const filteredPaymentRecords = computed(() => {
  if (!selectedDate) return paymentRecords.value
  return paymentRecords.value.filter((p) => {
    const pDate = new Date(p.paymentDate).toDateString()
    const sDate = new Date(selectedDate).toDateString()
    return pDate === sDate
  })
})

async function load() {
  const token = localStorage.getItem('accessToken') || ''
  if (!token) return
  paymentRecords.value = await fetchPaymentRecords({ token, apiBaseUrl, tripId })
}

watch(() => selectedDate, () => {}, { immediate: true })
onMounted(load)

function navigateToReport() {
  const id = route.params.tripId
  router.push(`/record/${id}/report`)
}
</script>
