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
      v-for="payment in paymentRecords"
      :key="payment.paymentId"
      class="flex justify-between items-center p-4 mb-2"
    >
      <div>
        <p class="text-sm text-[#626262]">
          {{ formatFullDateToKorean(new Date(payment.paymentDate)) }}
        </p>
        <p class="font-semibold text-base">
          {{ payment.paymentName }}
        </p>
      </div>
      <p class="font-bold text-lg">
        {{ formatCurrency(payment.paymentPrice) }}
      </p>
    </Card>

    <!-- 데이터가 없을 때 표시 -->
    <div
      v-if="paymentRecords.length === 0"
      class="text-center py-8 text-gray-500"
    >
      결제 내역이 없습니다.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { formatFullDateToKorean, formatCurrency } from '@/shared/utils/format'

import axios from 'axios'

import Card from '@/shared/components/atoms/card/Card.vue'
import ButtonExtraSmallMain from '@/shared/components/atoms/button/ButtonExtraSmallMain.vue'

import type { ApiPaymentRecord } from '@/entities/record/record.entity'

const { tripId } = defineProps<{
  tripId: number
}>()

const router = useRouter()
const route = useRoute()

const paymentRecords = ref<ApiPaymentRecord[]>([])

// 결제 내역 API 호출
const fetchPaymentRecords = async () => {
  try {
    const token = localStorage.getItem('accessToken')
    if (!token) throw new Error('Access token not found')

    const response = await axios.get(
      `http://localhost:8080/api/trips/${tripId}/records/payment-records`,
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

// RecordReport.vue 페이지로 이동
const navigateToReport = () => {
  const tripId = route.params.tripId
  router.push(`/record/${tripId}/report`)
}

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  fetchPaymentRecords()
})
</script>