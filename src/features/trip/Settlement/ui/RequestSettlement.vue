<template>
  <div class="w-full mt-7 flex flex-col gap-2">
    <TypographyHead3>정산 요청하기</TypographyHead3>
    <TypographyP2> 정산 요청 금액</TypographyP2>
    <Input
      v-model="settlementAmount"
      type="number"
    />
    <Input
      v-model="settlementMemo"
      placeholder="간단한 메모를 입력해주세요 (최대 30자)"
    />
    <TypographySubTitle2
      v-if="settlementMemberList.length == 0"
      class="text-moa-main-text w-full text-center py-4"
    >
      최소 한명의 멤버를 추가하여야 합니다.
    </TypographySubTitle2>
    <div
      v-for="member in settlementMemberList"
      :key="member.memberId"
      class="flex justify-between items-center"
    >
      <TypographySubTitle2>{{ member.memberName }}</TypographySubTitle2>
      <div class="flex justify-between items-center gap-2">
        <TypographySubTitle2>
          {{ formatNumber(settlementAmount / settlementMemberList.length) }}원
        </TypographySubTitle2>
        <button
          class="flex items-center"
          @click="removeMember(member.memberId)"
        >
          <i class="bi bi-x text-[25px]" />
        </button>
      </div>
    </div>

    <TypographySubTitle2 class="text-moa-sub-text mt-2">
      정산 친구 추가
    </TypographySubTitle2>
    <TypographySubTitle2
      v-if="unSettlementMemberList.length == 0"
      class="text-moa-main-text w-full text-center py-4"
    >
      추가할 수 있는 멤버가 없습니다
    </TypographySubTitle2>
    <div
      v-for="member in unSettlementMemberList"
      :key="member.memberId"
      class="flex justify-between items-center"
    >
      <TypographySubTitle2>{{ member.memberName }}</TypographySubTitle2>

      <button
        class="flex items-center"
        @click="addMember(member.memberId)"
      >
        <i class="bi bi-plus text-[25px]" />
      </button>
    </div>
    <ButtonMain :disabled="settlementMemberList.length == 0">
      정산 요청 보내기
    </ButtonMain>
  </div>
</template>
<script setup lang="ts">
import type { TripMember } from '@/entities/trip/trip.entity'
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import Input from '@/shared/components/atoms/input/Input.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import { formatNumber } from '@/shared/utils/format'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getMemberList } from '../services/settlement.service'

const settlementAmount = ref(0)
const settlementMemo = ref('')

const settlementMemberList = ref<TripMember[]>([])
const unSettlementMemberList = ref<TripMember[]>([])

const route = useRoute()
const tripId = route.params.tripId as string

function removeMember(id: string) {
  const index = settlementMemberList.value.findIndex((member) => member.memberId === id)
  if (index !== -1) {
    const [removed] = settlementMemberList.value.splice(index, 1)
    unSettlementMemberList.value.push(removed)
  }
}

function addMember(id: string) {
  const index = unSettlementMemberList.value.findIndex((member) => member.memberId === id)
  if (index !== -1) {
    const [restored] = unSettlementMemberList.value.splice(index, 1)
    settlementMemberList.value.push(restored)
  }
}

async function getMemberListFunction() {
  try {
    const result = await getMemberList(localStorage.getItem('accessToken')!, tripId)
    settlementMemberList.value = await result
  } catch (e) {
    console.error(e)
    alert('멤버를 불러오는데 실패하였습니다.')
  }
}

onMounted(() => {
  getMemberListFunction()
})
</script>
