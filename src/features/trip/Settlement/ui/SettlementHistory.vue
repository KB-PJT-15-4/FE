<template>
  <TypographyHead3>나의 정산내역</TypographyHead3>
  <Card
    v-for="(settlement, index) in userSettlementListMockData"
    :key="index"
    class="flex justify-between items-center"
  >
    <div>
      <div class="flex gap-2">
        <TypographyCaption>
          {{
            settlement.direction === SettlementDirection.RECEIVED ? '받은 요청' : '보낸 요청'
          }}
        </TypographyCaption>
        <TypographyCaption>{{ formatDateTime(settlement.date) }}</TypographyCaption>
      </div>

      <TypographyHead3>{{ formatNumber(settlement.amount) }}원</TypographyHead3>
    </div>
    <ButtonSmallMain v-if="settlement.status === SettlementStatus.WAITING">
      정산하기
    </ButtonSmallMain>
    <ButtonSmallSub v-else>
      {{
        settlement.status === SettlementStatus.COMPLETED ? '정산 완료' : '정산 진행중'
      }}
    </ButtonSmallSub>
  </Card>
</template>
<script setup lang="ts">
import { SettlementDirection, SettlementStatus } from '@/entities/trip/trip.entity'
import { userSettlementListMockData } from '@/entities/trip/trip.mock'
import ButtonSmallMain from '@/shared/components/atoms/button/ButtonSmallMain.vue'
import ButtonSmallSub from '@/shared/components/atoms/button/ButtonSmallSub.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyCaption from '@/shared/components/atoms/typography/TypographyCaption.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import { formatDateTime, formatNumber } from '@/shared/utils/format'
</script>
