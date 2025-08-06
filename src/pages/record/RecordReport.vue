<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-bold">
        결제 내역 리포트
      </h1>
      <button
        class="px-4 py-2 text-sm text-[#626262] bg-[#87BFFF] rounded-md"
        @click="goBack"
      >
        뒤로가기
      </button>
    </div>

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

      <!-- 총 금액 -->
      <div
        v-if="paymentRecords.length > 0"
        class="mt-6 p-4 bg-gray-100 rounded-lg"
      >
        <div class="flex justify-between items-center">
          <span class="text-lg font-semibold">총 결제 금액:</span>
          <span class="text-xl font-bold text-[#87BFFF]">
            {{ formatCurrency(totalAmount) }}
          </span>
        </div>
        <div class="text-sm text-gray-600 mt-1">
          총 {{ paymentRecords.length }}건의 결제
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { formatFullDateToKorean, formatCurrency } from '@/shared/utils/format'

import axios from 'axios'

import Card from '@/shared/components/atoms/card/Card.vue'

import type { ApiPaymentRecord } from '@/entities/record/record.entity'

const route = useRoute()
const router = useRouter()

const tripId = Number(route.params.tripId)
const paymentRecords = ref<ApiPaymentRecord[]>([])

// 총 결제 금액 계산
const totalAmount = computed(() => {
  return paymentRecords.value.reduce((sum, record) => sum + record.paymentPrice, 0)
})

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

// 뒤로가기
const goBack = () => {
  router.go(-1) // 이전 페이지로 돌아가기
}

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  fetchPaymentRecords()
})
</script>