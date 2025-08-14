<template>
  <!-- 가운데 정렬 컨테이너 -->
  <div class="w-full flex justify-center">
    <div class="w-full max-w-[360px] flex flex-col gap-2">
      <TypographyP2 class="ml-1">
        정산 제목
      </TypographyP2>

      <Input
        v-model="settlementMemo"
        placeholder="정산 제목을 입력해주세요 (예: 숙소비, 교통비 등)"
      />

      <TypographyP2 class="ml-1">
        정산 요청 금액
      </TypographyP2>
      <Input
        v-model="settlementAmount"
        type="number"
      />

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

      <div v-if="unSettlementMemberList.length > 0">
        <TypographySubTitle2 class="text-moa-sub-text mt-2">
          정산 친구 추가
        </TypographySubTitle2>

        <div
          v-for="member in unSettlementMemberList"
          :key="member.memberId"
          class="flex justify-between items-center my-2"
        >
          <TypographySubTitle2>{{ member.memberName }}</TypographySubTitle2>

          <button
            class="flex items-center"
            @click="addMember(member.memberId)"
          >
            <i class="bi bi-plus text-[25px]" />
          </button>
        </div>
      </div>

      <ButtonMain
        :disabled="
          settlementMemberList.length == 0 || settlementAmount == 0 || settlementMemo == ''
        "
        @click="makeSettlementFunction"
      >
        정산 요청 보내기
      </ButtonMain>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { SettleExpenses, TripMember } from '@/entities/trip/trip.entity'
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import Input from '@/shared/components/atoms/input/Input.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import { formatNumber } from '@/shared/utils/format'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getMemberList, makeSettlement } from '../services/settlement.service'

const settlementAmount = ref(0)
const settlementMemo = ref('')

const settlementMemberList = ref<TripMember[]>([])
const unSettlementMemberList = ref<TripMember[]>([])

const route = useRoute()
const tripId = route.params.tripId as string

function removeMember(id: number) {
  const index = settlementMemberList.value.findIndex((member) => member.memberId === id)
  if (index !== -1) {
    const [removed] = settlementMemberList.value.splice(index, 1)
    unSettlementMemberList.value.push(removed)
  }
}

function addMember(id: number) {
  const index = unSettlementMemberList.value.findIndex((member) => member.memberId === id)
  if (index !== -1) {
    const [restored] = unSettlementMemberList.value.splice(index, 1)
    settlementMemberList.value.push(restored)
  }
}

async function getMemberListFunction() {
  try {
    const result = await getMemberList(tripId)
    settlementMemberList.value = await result
  } catch (e) {
    console.error(e)
    alert('멤버를 불러오는데 실패하였습니다.')
  }
}

async function makeSettlementFunction() {
  try {
    const expenses: SettleExpenses[] = settlementMemberList.value.map((member) => ({
      memberId: member.memberId,
      amount: settlementAmount.value / settlementMemberList.value.length,
    }))

    await makeSettlement(tripId, settlementAmount.value.toString(), settlementMemo.value, expenses)
    settlementAmount.value = 0
    settlementMemo.value = ''

    alert('정산 요청이 완료되었습니다.')
  } catch (e) {
    console.error(e)
    alert('정산 요청을 실패하였습니다.')
  }
}

onMounted(() => {
  getMemberListFunction()
})
</script>
