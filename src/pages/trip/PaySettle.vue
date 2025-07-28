<template>
  <div class="w-full">
    <TypographyHead1>정산하기</TypographyHead1>
    <div class="mt-3 h-[65vh]">
      <div class="flex gap-1">
        <TypographyHead2>{{ settle.name }} </TypographyHead2>
        <TypographyHead2 class="text-moa-sub-text">
          님에게
        </TypographyHead2>
      </div>
      <div class="flex gap-1">
        <TypographyHead2>{{ formatNumber(settle.settleAmount) }}</TypographyHead2>
        <TypographyHead2 class="text-moa-sub-text">
          원을 보낼까요?
        </TypographyHead2>
      </div>
      <TypographyP2 class="mt-2 text-moa-sub-text">
        내 계좌 잔액 {{ formatNumber(settle.balance) }}원
      </TypographyP2>
    </div>

    <ButtonMain>보내기</ButtonMain>
  </div>
</template>
<script setup lang="ts">
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import TypographyHead2 from '@/shared/components/atoms/typography/TypographyHead2.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import { formatNumber } from '@/shared/utils/format'

// tripId, settleId로 조회
const settle = {
  settleId: '1',
  name: '강민재',
  settleAmount: 18000,
  balance: 240000,
}
</script>
