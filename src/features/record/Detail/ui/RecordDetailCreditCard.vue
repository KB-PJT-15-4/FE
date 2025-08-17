<template>
  <ButtonExtraSmallMain
    class="w-[60px] mb-2 text-sm"
    @click="navigateToReport"
  >
    Report
  </ButtonExtraSmallMain>

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

    <div v-if="filteredPaymentRecords.length === 0">
      <TypographySubTitle1 class="text-center py-8 text-moa-gray-text">
        {{ selectedDate ? '선택한 날짜에 결제 내역이 없습니다.' : '결제 내역이 없습니다.' }}
      </TypographySubTitle1>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PaymentRecord } from '@/entities/record/record.entity'
import ButtonExtraSmallMain from '@/shared/components/atoms/button/ButtonExtraSmallMain.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyHead2 from '@/shared/components/atoms/typography/TypographyHead2.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import { formatCurrency, formatFullDateToKorean } from '@/shared/utils/format'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPaymentRecords } from '../services/recordDetail.service'

const { tripId, selectedDate } = defineProps<{ tripId: number; selectedDate?: string }>()
const router = useRouter()
const route = useRoute()

const paymentRecords = ref<PaymentRecord[]>([])

const filteredPaymentRecords = computed(() => {
  if (!selectedDate) return paymentRecords.value
  const target = new Date(selectedDate).toDateString()
  return paymentRecords.value.filter((p) => new Date(p.paymentDate).toDateString() === target)
})

async function load() {
  try {
    paymentRecords.value = await getPaymentRecords(tripId)
  } catch (e) {
    console.error('결제 내역 조회 실패:', e)
    paymentRecords.value = []
  }
}

onMounted(load)

// Report 로 이동
const navigateToReport = () => {
  router.push({
    name: 'record_report',
    params: { tripId: route.params.tripId },
  })
}
</script>
