<template>
  <div class="w-full flex flex-col gap-3">
    <div>
      <TypographyHead2>{{ data.title }}</TypographyHead2>
      <TypographySubTitle2 class="text-moa-sub-text">
        {{ formatFullDateToKorean(new Date(data.date)) }}
      </TypographySubTitle2>
    </div>

    <div>
      <TypographyHead1>총 {{ formatNumber(data.amount) }} 원</TypographyHead1>
      <TypographySubTitle2 class="text-moa-sub-text">
        1인당 {{ formatNumber(data.amount / data.progresses.length) }} 원
      </TypographySubTitle2>
    </div>
    <TypographyHead2>정산 현황</TypographyHead2>

    <Card
      v-for="(item, index) in data.progresses"
      :key="index"
      class="flex justify-between items-center py-4"
    >
      <TypographyHead3>{{ item.name }}</TypographyHead3>
      <div>
        <div v-if="item.status == '정산 진행중'">
          <Tag color="main">
            <TypographyCaption>정산진행중</TypographyCaption>
          </Tag>
        </div>
        <div v-if="item.status == '정산 완료'">
          <Tag color="pink">
            <TypographyCaption>정산완료</TypographyCaption>
          </Tag>
        </div>
      </div>
    </Card>
  </div>
</template>
<script setup lang="ts">
import { settlementProgressStatusMockData } from '@/entities/trip/trip.mock'
import Card from '@/shared/components/atoms/card/Card.vue'
import Tag from '@/shared/components/atoms/tag/Tag.vue'
import TypographyCaption from '@/shared/components/atoms/typography/TypographyCaption.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import TypographyHead2 from '@/shared/components/atoms/typography/TypographyHead2.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import { formatFullDateToKorean, formatNumber } from '@/shared/utils/format'
const data = settlementProgressStatusMockData
</script>
