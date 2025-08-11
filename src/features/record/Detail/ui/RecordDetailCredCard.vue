<template>
  <ButtonExtraSmallMain
    class="w-[60px] mb-2 text-sm"
    @click="navigateToReport"
  >
    가져오기
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
        <TypographyP2 class="text-[#626262]">
          {{ formatFullDateToKorean(new Date(payment.paymentDate)) }}
        </TypographyP2>
      </div>
      <TypographyHead2>{{ formatCurrency(payment.paymentPrice) }}</TypographyHead2>
    </Card>

    <!-- 데이터가 없을 때 표시 -->
    <div
      v-if="filteredPaymentRecords.length === 0"
      class="text-center py-8 text-gray-500"
    >
      {{ selectedDate ? '선택한 날짜에 결제 내역이 없습니다.' : '결제 내역이 없습니다.' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency, formatFullDateToKorean } from '@/shared/utils/format'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import axios from 'axios'

import ButtonExtraSmallMain from '@/shared/components/atoms/button/ButtonExtraSmallMain.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyHead2 from '@/shared/components/atoms/typography/TypographyHead2.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'

import type { ApiPaymentRecord } from '@/entities/record/record.entity'

const { tripId, selectedDate } = defineProps<{
  tripId: number
  selectedDate?: string
}>()

const router = useRouter()
const route = useRoute()

const paymentRecords = ref<ApiPaymentRecord[]>([])

// 선택된 날짜에 따라 결제 내역을 필터링
const filteredPaymentRecords = computed(() => {
  if (!selectedDate) {
    return paymentRecords.value
  }

  return paymentRecords.value.filter((payment) => {
    const paymentDate = new Date(payment.paymentDate)
    const selectedDateObj = new Date(selectedDate)

    return paymentDate.toDateString() === selectedDateObj.toDateString()
  })
})

// 결제 내역 API 호출
const fetchPaymentRecords = async () => {
  try {
    const token = localStorage.getItem('accessToken')
    if (!token) throw new Error('Access token not found')

    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/api/trips/${tripId}/records/payment-records`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (response.data.code === 'S200') {
      paymentRecords.value = response.data.data || []
    } else {
      console.error('API 응답 오류:', response.data.message)
      paymentRecords.value = []
    }
  } catch (error) {
    console.error('결제 내역 조회 실패:', error)
    paymentRecords.value = []
  }
}

watch(
  () => selectedDate,
  () => {},
  { immediate: true }
)

onMounted(() => {
  fetchPaymentRecords()
})

// RecordReport.vue 페이지로 이동
const navigateToReport = () => {
  const tripId = route.params.tripId
  router.push(`/record/${tripId}/report`)
}
</script>
