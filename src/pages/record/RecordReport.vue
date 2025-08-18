<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex items-center justify-between mb-4">
      <TypographyHead2>결제 내역 리포트</TypographyHead2>
      <ButtonExtraSmallMain
        class="text-sm"
        @click="goBack"
      >
        뒤로이동
      </ButtonExtraSmallMain>
    </div>

    <!-- 결제 내역 카드들 -->
    <div>
      <Card
        v-for="payment in paymentRecords"
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
import { formatCurrency, formatFullDateToKorean } from '@/shared/utils/format'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ButtonExtraSmallMain from '@/shared/components/atoms/button/ButtonExtraSmallMain.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyHead2 from '@/shared/components/atoms/typography/TypographyHead2.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'

import type { PaymentRecord } from '@/entities/record/record.entity'
import { getPaymentRecords } from '@/features/record/Detail/services/recordDetail.service'

const route = useRoute()
const router = useRouter()

const tripId = Number(route.params.tripId)
const paymentRecords = ref<PaymentRecord[]>([])

// 총 결제 금액 계산
const totalAmount = computed(() => {
  return paymentRecords.value.reduce((sum, record) => sum + record.paymentPrice, 0)
})

// 결제 내역 API 호출
const fetchPaymentRecords = async () => {
  try {
    paymentRecords.value = await getPaymentRecords(tripId)
  } catch (e) {
    console.error(e)
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
