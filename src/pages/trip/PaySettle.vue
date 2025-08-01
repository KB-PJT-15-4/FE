<template>
  <div
    v-if="settlementInfo"
    class="w-full"
  >
    <TypographyHead1>정산하기</TypographyHead1>
    <div class="mt-3 h-[65vh]">
      <div class="flex gap-1">
        <TypographyHead2>{{ settlementInfo.receiverName }} </TypographyHead2>
        <TypographyHead2 class="text-moa-sub-text">
          님에게
        </TypographyHead2>
      </div>
      <div class="flex gap-1">
        <TypographyHead2>{{ formatNumber(settlementInfo.shareAmount) }}</TypographyHead2>
        <TypographyHead2 class="text-moa-sub-text">
          원을 보낼까요?
        </TypographyHead2>
      </div>
      <TypographyP1 class="text-moa-sub-text mt-3">
        잔액 {{ formatNumber(settlementInfo.balance) }}원
      </TypographyP1>
    </div>
    <div class="flex w-full justify-between">
      <ButtonMediumSub>취소</ButtonMediumSub>
      <ButtonMediumMain @click="postSettleFunction">
        보내기
      </ButtonMediumMain>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { SettleInfo } from '@/entities/trip/trip.entity'
import {
  getSettlementInfo,
  postSettle,
} from '@/features/trip/Settlement/services/settlement.service'
import ButtonMediumMain from '@/shared/components/atoms/button/ButtonMediumMain.vue'
import ButtonMediumSub from '@/shared/components/atoms/button/ButtonMediumSub.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import TypographyHead2 from '@/shared/components/atoms/typography/TypographyHead2.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import { formatNumber } from '@/shared/utils/format'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const settlementInfo = ref<SettleInfo>()
const route = useRoute()
const settleId = route.params.settleId as string

async function getSettlementInfoFunction() {
  try {
    settlementInfo.value = await getSettlementInfo(localStorage.getItem('accessToken')!, settleId)
  } catch (e) {
    alert('정산 정보를 불러오지 못하였습니다.')
  }
}

async function postSettleFunction() {
  if (settlementInfo.value) {
    if (
      window.confirm(
        `${settlementInfo.value!.receiverName}님에게 ${formatNumber(settlementInfo.value!.shareAmount)}원을 송금하시겠습니까?`
      )
    ) {
      try {
        await postSettle(
          localStorage.getItem('accessToken')!,
          settleId,
          settlementInfo.value!.shareAmount
        )
        alert('송금이 완료되었습니다.')
      } catch (e) {
        console.error(e)
        alert('송금을 완료하지 못했습니다.')
      }
    }
  }
}

onMounted(() => {
  getSettlementInfoFunction()
})
</script>
