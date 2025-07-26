<template>
  <div class="w-full">
    <TypographyHead1>정산하기</TypographyHead1>
    <div class="mt-3 h-[65vh]">
      <div class="flex gap-1">
        <TypographyHead2>{{ member.name }} </TypographyHead2>
        <TypographyHead2 class="text-moa-sub-text">
          님에게
        </TypographyHead2>
      </div>
      <div class="flex gap-1">
        <TypographyHead2>18,000</TypographyHead2>
        <TypographyHead2 class="text-moa-sub-text">
          원을 보낼까요?
        </TypographyHead2>
      </div>
    </div>

    <ButtonMain>보내기</ButtonMain>
  </div>
</template>
<script setup lang="ts">
import { tripMemberListMockData } from '@/entities/trip/trip.mock'
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import TypographyHead2 from '@/shared/components/atoms/typography/TypographyHead2.vue'

const member = tripMemberListMockData[0]
</script>
